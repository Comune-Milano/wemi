import { VoucherManagement } from 'controller/voucher';

export default {
  Query: { 
    getVoucherList: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getVouchers(args.params || {});
    },
    getVoucher: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.getVoucher(args);
    },
    getMaxOrderVoucher: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getMaxOrderVoucher();
    },
    EstraiStatiVoucher: async (parent, args, context, info) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getEstraiStatiVoucher();
    },
    getVoucherTransactionList: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getVoucherTransactionList(args.params || {});
    },
    getVoucherTransaction: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getVoucherTransaction(args || {});
    },
    getTransactionDetails: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.getTransactionDetails(args);
    },
    EstraiStatiTransazioneVoucher: async (parent, args, context, info) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getEstraiStatiTransazioneVoucher();
    },
    EstraiSostegnoEconomico: async (parent, args, context, info) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getEstraiSostegnoEconomico();
    },
    getCitizenVoucherList: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.getCitizenVoucherList(args || {});
    },
    getCitizenVoucherTransactionsList: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.getCitizenVoucherTransactionsList(args || {});
    },
    hasCitizenVoucher: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.hasCitizenVoucher(args.params || {});
    },
    hasTransactionsCont: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.hasTransactionsCont(args.params || {});
    },
    hasVouchersCont: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.hasVouchersCont(args.params || {});
    },
    downloadTransactionsCont: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.downloadTransactionsCont(args.params || {});
    },
    downloadVouchersCont: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.downloadVouchersCont(args.params || {});
    },
    getUsableVoucherListByUser: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getUsableVoucherListByUser(args);
    },
    getVoucherByIdRichiesta:(parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.getVoucherByIdRichiesta(args);
    },
  }, 
  Mutation: { 
    ripristinoVoucher: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.ripristinoVoucher(args);
    },
    annullaVoucher: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.annullaVoucher(args);
    },
    contabilizzaTransazioneVoucher: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.contabilizzaTransazioneVoucher(args);
    },
    stornoTransazioneVoucher: (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.stornoTransazioneVoucher(args);
    },
    elaboraVouchers: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.elaboraVouchers(args);
    },
    uploadVouchers: async (parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return await voucherManagement.uploadVouchers(args);
    },
    
    setVoucherTimestamp:(parent, args, context) => {
      const voucherManagement = new VoucherManagement(context);
      return voucherManagement.setVoucherTimestamp(args);
    },
  }, 
};