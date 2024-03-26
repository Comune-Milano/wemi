import isEqual from 'react-fast-compare';

export const onChangeRadio = (voucher, vouchers, setFormFields, amount, dataset) => {
  if (voucher.isActive) {
    voucher.isActive = false;
  } else {
    voucher.isActive = true;
  }
  let { numberSelectedVouchers } = dataset;
  let { selectedVouchers } = dataset;
// ATTIVAZIONE DI UN VOUCHER
  if (voucher.isActive) {
    numberSelectedVouchers += 1;
// ATTIVAZIONE DI UN VOUCHER E NESSUN ALTRO VOUCHER ATTIVO
    if (numberSelectedVouchers === 1) {
      // in caso di importo residuo maggiore del costo totale del servizio
      if (voucher.remainingImport >= amount) {
        voucher.voucherShare = amount;
        voucher.maxShare = amount;
        selectedVouchers.push(voucher);
        const voucherShares = selectedVouchers.map(element => element.voucherShare);
        const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
        const voucherNotActive = vouchers.filter(element => !element.isActive && !isEqual(element, voucher));
        const updatedNotActiveVouchers = voucherNotActive.map(element => {
          const newMaxShare = Number((amount - voucher.voucherShare).toFixed(2));
          return ({
            ...element,
            maxShare: newMaxShare > voucher.remainingImport ? voucher.remainingImport : newMaxShare,
          });
        });
        const allVouchers = updatedNotActiveVouchers;
        allVouchers.push(voucher);
        allVouchers.sort((a, b) => a.id - b.id);
        setFormFields({
          numberSelectedVouchers,
          vouchers: allVouchers,
          selectedVouchers,
          totalVoucherImport,
        });
      } else {
        //  in caso di importo residuo minore del costo totale del servizio
        voucher.voucherShare = voucher.remainingImport;
        voucher.maxShare = voucher.remainingImport;
        selectedVouchers.push(voucher);
        const voucherShares = selectedVouchers.map(element => element.voucherShare);
        const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
        const voucherNotActive = vouchers.filter(element => !element.isActive && !isEqual(element, voucher));
        const updatedNotActiveVouchers = voucherNotActive.map(element => {
          const newMaxShare = Number((amount - voucher.voucherShare).toFixed(2));
          return ({
            ...element,
            maxShare: newMaxShare > element.remainingImport ? element.remainingImport : newMaxShare,
          });
        });
        const allVouchers = updatedNotActiveVouchers;
        allVouchers.push(voucher);
        allVouchers.sort((a, b) => a.id - b.id);
        setFormFields({
          numberSelectedVouchers,
          vouchers: allVouchers,
          selectedVouchers,
          totalVoucherImport,
        });
      }
    } else {
// ATTIVAZIONE DI UN VOUCHER CON ALTRI VOUCHER GIA' ATTIVI
      const voucherShare = Number((amount / numberSelectedVouchers).toFixed(2));
      const difference = Number((amount - (voucherShare * numberSelectedVouchers)).toFixed(2));
       // gli altri voucher attivi con la quota voucher aggiornata
      const updateShareVouchers = selectedVouchers.map(element => {
        const newVoucherShare = Number(((amount - Number((voucherShare + difference).toFixed(2))) / selectedVouchers.length).toFixed(2));
        return (
        ({ ...element,
          voucherShare: element.remainingImport >= voucherShare ? newVoucherShare : element.remainingImport,
          maxShare: element.remainingImport >= voucherShare ? newVoucherShare : element.remainingImport,
        }));
      });
      // il voucher appena attivato
      if (voucher.remainingImport >= voucherShare) {
        const voucherShares = updateShareVouchers.map(element => element.voucherShare);
        const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
        const newVoucherShare = Number((amount - totalVoucherImport).toFixed(2));
        voucher.voucherShare = newVoucherShare > voucher.remainingImport ? voucher.remainingImport : newVoucherShare;
        voucher.maxShare = newVoucherShare > voucher.remainingImport ? voucher.remainingImport : newVoucherShare;
      } else {
        voucher.voucherShare = voucher.remainingImport;
        voucher.maxShare = voucher.remainingImport;
      }

      // aggiorno gli altri voucher attivi in  base agli arrotondamenti e alla loro quota nuova max
      const shares = updateShareVouchers.map(element => element.voucherShare);
      const totalImport = Number(shares.reduce((a, b) => a + b, 0).toFixed(2));
      const newShare = Number((amount - (totalImport + voucher.voucherShare)).toFixed(2));
      let newVouchersUpdated;
      if (newShare > 0) {
        newVouchersUpdated = updateShareVouchers.map(element => {
          const newVoucherShare = Number((element.voucherShare + newShare).toFixed(2));
          return ({
            ...element,
            voucherShare: newVoucherShare > element.remainingImport ? element.remainingImport : newVoucherShare,
            maxShare: newVoucherShare > element.remainingImport ? element.remainingImport : newVoucherShare,
          });
        });
        const newShares = newVouchersUpdated.map(element => element.voucherShare);
        const newSharesTotalImport = Number(newShares.reduce((a, b) => a + b, 0).toFixed(2));
        const newTotalImport = Number((newSharesTotalImport + voucher.voucherShare).toFixed(2));
        if (newTotalImport > amount) {
          const excess = Number((newTotalImport - amount).toFixed(2));
          const differenceToAdd = Number((excess / updateShareVouchers.length).toFixed(2));
          const differenceRound = Number(((differenceToAdd * updateShareVouchers.length) - excess).toFixed(2));
          newVouchersUpdated = updateShareVouchers.map((element, index, array) => {
            const newShareUpdated = Number((element.voucherShare + differenceToAdd).toFixed(2));
            if (index + 1 === array.length) {
              const roundedShare = Number((newShareUpdated - differenceRound).toFixed(2));
              return ({
                ...element,
                voucherShare: roundedShare > element.remainingImport ? element.remainingImport : roundedShare,
                maxShare: roundedShare > element.remainingImport ? element.remainingImport : roundedShare,
              });
            }
            return ({
              ...element,
              voucherShare: newShareUpdated > element.remainingImport ? element.remainingImport : newShareUpdated,
              maxShare: newShareUpdated > element.remainingImport ? element.remainingImport : newShareUpdated,
            });
          });
        }
      } else {
        newVouchersUpdated = updateShareVouchers;
      }

      // i voucher non attivi
      const voucherNotActive = vouchers.filter(element => !element.isActive && !isEqual(element, voucher));
      selectedVouchers = newVouchersUpdated;
      selectedVouchers.push(voucher);
      const voucherShares = selectedVouchers.map(element => element.voucherShare);
      const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
      const updatedNotActiveVouchers = voucherNotActive.map(element => {
        const newMaxShare = Number((amount - totalVoucherImport).toFixed(2));
        return ({
          ...element,
          maxShare: newMaxShare > element.remainingImport ? element.remainingImport : newMaxShare,
        });
      });
      // tutti i voucher
      const allVouchers = selectedVouchers.concat(updatedNotActiveVouchers);
      allVouchers.sort((a, b) => a.id - b.id);
      setFormFields({
        selectedVouchers,
        vouchers: allVouchers,
        numberSelectedVouchers,
        totalVoucherImport,
      });
    }
  } else {
// //DISATTIVAZIONE DI UN VOUCHER
    numberSelectedVouchers -= 1;
    voucher.voucherShare = 0;
// //DISATTIVAZIONE DI UN VOUCHER CON ALTRI VOUCHER ANCORA ATTIVI
    if (numberSelectedVouchers >= 1) {
      const voucherShare = Number((amount / numberSelectedVouchers).toFixed(2));
      const difference = Number((amount - (voucherShare * numberSelectedVouchers)).toFixed(2));
        // gli altri voucher attivi con la quota voucher aggiornata
      const vouchersActive = vouchers.filter(element => element.isActive);
      const updateShareVouchers = vouchersActive.map((element, index, array) => {
        const newVoucherShare = Number((voucherShare + difference).toFixed(2));
        if (index + 1 === array.length) {
          return (
          { ...element,
            voucherShare: element.remainingImport >= voucherShare ? newVoucherShare : element.remainingImport,
            maxShare: element.remainingImport >= voucherShare ? newVoucherShare : element.remainingImport,
          });
        } return (
        { ...element,
          voucherShare: element.remainingImport >= voucherShare ? voucherShare : element.remainingImport,
          maxShare: element.remainingImport >= voucherShare ? voucherShare : element.remainingImport,
        });
      });

      // aggiorno gli altri voucher attivi in  base agli arrotondamenti e alla loro quota nuova max
      const shares = updateShareVouchers.map(element => element.voucherShare);
      const totalImport = Number(shares.reduce((a, b) => a + b, 0).toFixed(2));
      const newShare = Number((amount - (totalImport + voucher.voucherShare)).toFixed(2));
      let newVouchersUpdated;
      if (newShare > 0) {
        newVouchersUpdated = updateShareVouchers.map(element => {
          const newVoucherShare = Number((element.voucherShare + newShare).toFixed(2));
          return ({
            ...element,
            voucherShare: newVoucherShare > element.remainingImport ? element.remainingImport : newVoucherShare,
            maxShare: newVoucherShare > element.remainingImport ? element.remainingImport : newVoucherShare,
          });
        });
        const newShares = newVouchersUpdated.map(element => element.voucherShare);
        const newSharesTotalImport = Number(newShares.reduce((a, b) => a + b, 0).toFixed(2));
        const newTotalImport = Number((newSharesTotalImport + voucher.voucherShare).toFixed(2));
        if (newTotalImport > amount) {
          const excess = Number((newTotalImport - amount).toFixed(2));
          const differenceToAdd = Number((excess / updateShareVouchers.length).toFixed(2));
          const differenceRound = Number(((differenceToAdd * updateShareVouchers.length) - excess).toFixed(2));
          newVouchersUpdated = updateShareVouchers.map((element, index, array) => {
            const newShareUpdated = Number((element.voucherShare + differenceToAdd).toFixed(2));
            if (index + 1 === array.length) {
              const roundedShare = Number((newShareUpdated - differenceRound).toFixed(2));
              return ({
                ...element,
                voucherShare: roundedShare > element.remainingImport ? element.remainingImport : roundedShare,
                maxShare: roundedShare > element.remainingImport ? element.remainingImport : roundedShare,
              });
            }
            return ({
              ...element,
              voucherShare: newShareUpdated > element.remainingImport ? element.remainingImport : newShareUpdated,
              maxShare: newShareUpdated > element.remainingImport ? element.remainingImport : newShareUpdated,
            });
          });
        }
      } else {
        newVouchersUpdated = updateShareVouchers;
      }


        // i voucher non attivi
      const voucherNotActive = vouchers.filter(element => !element.isActive && !isEqual(element, voucher));
        // tutti i voucher
      const allVouchers = newVouchersUpdated.concat(voucherNotActive);
      selectedVouchers = newVouchersUpdated.filter(element => !isEqual(element, voucher));
      selectedVouchers.sort((a, b) => a.id - b.id);
      const voucherShares = selectedVouchers.map(element => element.voucherShare);
      const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
      if (totalVoucherImport === amount) {
        voucher.maxShare = 0;
      } else {
        const newMaxShare = Number((amount - totalVoucherImport).toFixed(2));
        voucher.maxShare = newMaxShare > voucher.remainingImport ? voucher.remainingImport : newMaxShare;
      }
      allVouchers.push(voucher);
      allVouchers.sort((a, b) => a.id - b.id);
      setFormFields({
        numberSelectedVouchers,
        vouchers: allVouchers,
        selectedVouchers,
        totalVoucherImport,
      });
    } else {
// //DISATTIVAZIONE DI UN VOUCHER CON ZERO VOUCHER ATTIVI
      selectedVouchers = [];
      const totalVoucherImport = 0;
      numberSelectedVouchers = 0;
      setFormFields({
        vouchers,
        numberSelectedVouchers,
        selectedVouchers,
        totalVoucherImport,
      });
    }
  }
};


export const onChangeInputNumber = (value, voucher, vouchers, setFormFields, amount, dataset) => {
  // IN CASO IL VALORE INSERITO SIA PIU' GRANDE DELLA MAX QUOTA VOUCHER,
  // IL VALORE INSERITO DIVENTA LA MAX QUOTA VOUCHER
  if (Number(value) > Number(voucher.maxShare)) {
    value = Number(voucher.maxShare);
  }
  let activeVoucherShares = 0;
  let { numberSelectedVouchers } = dataset;
  // IN CASO DI QUOTA CON VALORE 0
  if (parseFloat(value, 10) === 0 || Number.isNaN(parseInt(value, 10))) {
    voucher.isActive = false;
    voucher.voucherShare = Number(value);
    // voucher.maxShare = 0;
    numberSelectedVouchers = vouchers.filter(element => element.isActive).length;
    const otherActiveVouchers = vouchers.filter(element => element.isActive);
    // modifico la max quota degli altri voucher attivi (se ci sono)
    if (otherActiveVouchers.length) {
      const otherMaxShare = otherActiveVouchers.map(element => element.voucherShare);
      activeVoucherShares = Number((otherMaxShare.reduce((a, b) => a + b, 0) + Number(value)).toFixed(2));
      const difference = Number((amount - activeVoucherShares).toFixed(2));
      const otherVouchersUpdated = otherActiveVouchers.map(updateVoucherShare => {
        const newMaxShare = Number((updateVoucherShare.voucherShare + difference).toFixed(2));
        return ({ ...updateVoucherShare, maxShare: updateVoucherShare.remainingImport > newMaxShare ? newMaxShare : updateVoucherShare.remainingImport });
      });
      const voucherNotActive = vouchers.filter(element => !element.isActive && !isEqual(voucher, element));
      const allVouchers = otherVouchersUpdated.concat(voucherNotActive);
      allVouchers.push(voucher);
      allVouchers.sort((a, b) => a.id - b.id);
      const selectedVouchers = otherVouchersUpdated;
      selectedVouchers.sort((a, b) => a.id - b.id);
      const voucherShares = selectedVouchers.map(element => element.voucherShare);
      const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
      setFormFields({ vouchers: allVouchers,
        selectedVouchers,
        numberSelectedVouchers,
        totalVoucherImport });
    } else {
      setFormFields({
        selectedVouchers: [],
        vouchers,
        totalVoucherImport: 0,
        numberSelectedVouchers: 0,
      });
    }
  } else {
    // IN CASO DI QUOTA CON VALORE PIU' DI 0
    if (!voucher.isActive) {
      numberSelectedVouchers += 1;
    }
    voucher.isActive = true;
    voucher.voucherShare = Number(value);
    const otherActiveVouchers = vouchers.filter(element => element.isActive && !isEqual(element, voucher));
    // modifico la max quota degli altri voucher attivi (se ci sono)
    if (otherActiveVouchers.length) {
      const otherMaxShare = otherActiveVouchers.map(element => element.voucherShare);
      activeVoucherShares = Number((otherMaxShare.reduce((a, b) => a + b, 0) + Number(value)).toFixed(2));
      const newVoucherMaxShare = Number((amount - (otherMaxShare.reduce((a, b) => a + b, 0))).toFixed(2));
      const difference = Number((amount - activeVoucherShares).toFixed(2));
      voucher.maxShare = newVoucherMaxShare > voucher.remainingImport ? voucher.remainingImport : newVoucherMaxShare;
      const otherVouchersUpdated = otherActiveVouchers.map(updateVoucherShare => {
        const newMaxShare = Number((updateVoucherShare.voucherShare + difference).toFixed(2));
        return ({ ...updateVoucherShare, maxShare: updateVoucherShare.remainingImport > newMaxShare ? newMaxShare : updateVoucherShare.remainingImport });
      });
      const voucherNotActive = vouchers.filter(element => !element.isActive);
      const selectedVouchers = otherVouchersUpdated;
      selectedVouchers.push(voucher);
      selectedVouchers.sort((a, b) => a.id - b.id);
      const voucherShares = selectedVouchers.map(element => element.voucherShare);
      const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
      const updatedNotActiveVouchers = voucherNotActive.map(element => {
        const newMaxShare = Number((amount - totalVoucherImport).toFixed(2));
        return ({
          ...element,
          maxShare: newMaxShare > element.remainingImport ? element.remainingImport : newMaxShare,
        });
      });
      const allVouchers = selectedVouchers.concat(updatedNotActiveVouchers);
      allVouchers.sort((a, b) => a.id - b.id);
      setFormFields({ vouchers: allVouchers,
        selectedVouchers,
        numberSelectedVouchers,
        totalVoucherImport });
    } else {
      const selectedVouchers = [];
      selectedVouchers.push(voucher);
      const voucherShares = selectedVouchers.map(element => element.voucherShare);
      const totalVoucherImport = Number(voucherShares.reduce((a, b) => a + b, 0).toFixed(2));
      const voucherNotActive = vouchers.filter(element => !element.isActive && !isEqual(element, voucher));
      const updatedNotActiveVouchers = voucherNotActive.map(element => {
        const newMaxShare = Number((amount - totalVoucherImport).toFixed(2));
        return ({
          ...element,
          maxShare: newMaxShare > element.remainingImport ? element.remainingImport : newMaxShare,
        });
      });
      const allVouchers = updatedNotActiveVouchers.concat(selectedVouchers);
      allVouchers.sort((a, b) => a.id - b.id);
      setFormFields({ vouchers: allVouchers,
        selectedVouchers,
        numberSelectedVouchers,
        totalVoucherImport,
      });
    }
  }
};
