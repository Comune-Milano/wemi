/* eslint-disable no-underscore-dangle */

import { loggerService } from 'services/Logger';

export class ExternalRedirectManager {
  /**
   * @type Array<Function>
   */
  _tasks;

  constructor() {
    this._tasks = [];
  }

  /**
   * Determines if the provided url is external or nor.
   * @param {string} url
   * @returns {boolean}
   */
  static isExternalUrl(url) {
    const domain = targetUrl => targetUrl.replace('http://', '')
      .replace('https://', '')
      .split('/')[0];

    const urlDomain = domain(url);
    const internalDomain = domain(window.location.href);

    return urlDomain !== internalDomain;
  }

  /**
   * Returns all registered tasks count.
   * @returns {number}
   */
  get tasksCount() {
    return this._tasks.length;
  }

  /**
   * Unschedule the given task.
   * @param {*} task
   */
  unscheduleTask(task) {
    const newTasks = this._tasks.filter(value => value !== task);
    this._tasks = newTasks;

    loggerService.info('(ExternalRedirectManager) Unschedule task', task);
    loggerService.info('(ExternalRedirectManager) New tasks set', this._tasks);
  }

  /**
   * Schedule a task for execution before external redirection.
   * @param {Function} handler
   */
  scheduleTask(task) {
    if (!(task instanceof Function)) {
      throw new Error('(ExternalRedirectManager) Scheduling - The provided handler is not a function');
    }

    const taskAlreadyScheduled = this._tasks.some(value => value === task);
    if (taskAlreadyScheduled) {
      loggerService.warn('(ExternalRedirectManager) Scheduling - You are registering the same handler more than one time');
    }

    this._tasks.push(task);
    loggerService.info('(ExternalRedirectManager) Scheduled new task', task);
    loggerService.info('(ExternalRedirectManager) New tasks set', this._tasks);

    // Return an unsubscription function.
    return () => this.unscheduleTask(task);
  }

  /**
   * Runs all tasks.
   * @returns {Promise} A promise that's resolved when all async tasks are resolved.
   */
  async flushTasks() {
    loggerService.info(`(ExternalRedirectManager) Flushing all tasks. Tasks length ${this.tasksCount}`);
    const promisifiedTasks = this._tasks.map(task => task());
    return Promise.all(promisifiedTasks);
  }

  /**
   * Flush all scheduled tasks and then perform the redirect.
   * @param {string} externalUrl The url to redirect.
   */
  async redirect(externalUrl) {
    const isExternalUrl = ExternalRedirectManager.isExternalUrl(externalUrl);
    if (!isExternalUrl) {
      // throw new Error('You should not use "ExternalRedirectManager" service to perform an internal navigation.');
      loggerService.warn('You should not use "ExternalRedirectManager" service to perform an internal navigation.');
    }

    // Flushes all tasks and performs the redirect.
    await this.flushTasks();

    window.location.href = externalUrl;
  }
}

const extRedirectManager = new ExternalRedirectManager();
export { extRedirectManager };
