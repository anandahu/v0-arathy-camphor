// Export verification utility to ensure all required functions are properly exported

import {
  // Customer functions
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  // Offline Product functions
  getAllOfflineProducts,
  getOfflineProductById,
  getOfflineProductsByCategory,
  addOfflineProduct,
  updateOfflineProduct,
  deleteOfflineProduct,
  // Invoice functions
  getAllInvoices,
  getInvoiceById,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  // Payment functions
  getAllPayments,
  getPaymentsByInvoiceId,
  addPayment,
  // Tax functions
  getTaxSettings,
  updateTaxSettings,
  // Calculation functions
  calculateItemTotal,
  calculateInvoiceTotals,
  calculateUnitPrice,
  getAvailableUnits,
  // Report functions
  getFinancialReport,
  getTopSellingProducts,
  // Search functions
  searchOfflineProducts,
  searchCustomers,
  // Validation functions
  validateCustomerData,
  validateOfflineProductData,
  // Utility functions
  formatCurrency,
  formatDate,
  generateInvoiceNumber,
  generateCustomerId,
  // Types
  type Customer,
  type OfflineProduct,
  type ProductUnit,
  type InvoiceItem,
  type Invoice,
  type Payment,
  type TaxSettings,
  // Constants
  COMMON_UNITS,
} from "@/lib/billing"

// Verification function to ensure all exports are available
export function verifyExports() {
  const exports = {
    // Customer functions
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,

    // Offline Product functions
    getAllOfflineProducts,
    getOfflineProductById,
    getOfflineProductsByCategory,
    addOfflineProduct,
    updateOfflineProduct,
    deleteOfflineProduct,

    // Invoice functions
    getAllInvoices,
    getInvoiceById,
    addInvoice,
    updateInvoice,
    deleteInvoice,

    // Payment functions
    getAllPayments,
    getPaymentsByInvoiceId,
    addPayment,

    // Tax functions
    getTaxSettings,
    updateTaxSettings,

    // Calculation functions
    calculateItemTotal,
    calculateInvoiceTotals,
    calculateUnitPrice,
    getAvailableUnits,

    // Report functions
    getFinancialReport,
    getTopSellingProducts,

    // Search functions
    searchOfflineProducts,
    searchCustomers,

    // Validation functions
    validateCustomerData,
    validateOfflineProductData,

    // Utility functions
    formatCurrency,
    formatDate,
    generateInvoiceNumber,
    generateCustomerId,

    // Constants
    COMMON_UNITS,
  }

  console.log("✅ All billing module exports verified:", Object.keys(exports).length, "functions/constants exported")
  return exports
}

// Type verification
export type ExportedTypes = {
  Customer: Customer
  OfflineProduct: OfflineProduct
  ProductUnit: ProductUnit
  InvoiceItem: InvoiceItem
  Invoice: Invoice
  Payment: Payment
  TaxSettings: TaxSettings
}

export default verifyExports
