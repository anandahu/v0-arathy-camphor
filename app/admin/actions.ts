"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { login, logout } from "@/lib/auth"
import { addProduct, updateProduct, deleteProduct, type Product } from "@/lib/products"
import { addCategory, updateCategory, deleteCategory, type Category } from "@/lib/categories"
import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  addPayment,
  addOfflineProduct,
  updateOfflineProduct,
  deleteOfflineProduct,
  validateCustomerData,
  validateOfflineProductData,
  type Invoice,
  type Payment,
} from "@/lib/billing"
import { saveUploadedImage } from "@/lib/image-upload"

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Username and password are required" }
  }

  const result = await login(username, password)

  if (result.success) {
    return { success: true, redirectTo: "/admin/dashboard" }
  } else {
    return { error: result.error || "Login failed" }
  }
}

export async function logoutAction() {
  await logout()
  redirect("/admin/login")
}

export async function addProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const category = formData.get("category") as string
    const weights = (formData.get("weights") as string).split(",").map((w) => w.trim())
    const tags = formData.getAll("tags") as ("top-selling" | "best-selling" | "offer")[]
    const sku = formData.get("sku") as string
    const stock = formData.get("stock") ? Number.parseInt(formData.get("stock") as string) : undefined
    const manufacturer = formData.get("manufacturer") as string

    // Handle image uploads
    const imageFiles = formData.getAll("imageFiles") as File[]
    const existingImages = formData.getAll("existingImages") as string[]

    const uploadedImagePaths: string[] = []

    // Process new image uploads
    for (const file of imageFiles) {
      if (file.size > 0) {
        try {
          const uploadedImage = await saveUploadedImage(file)
          uploadedImagePaths.push(uploadedImage.path)
        } catch (error) {
          console.error("Error uploading image:", error)
        }
      }
    }

    // Combine existing and new images
    const allImages = [...existingImages, ...uploadedImagePaths]

    if (!name || !description || !price || !category) {
      return { error: "All required fields must be filled" }
    }

    const productData: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
      name,
      description,
      price,
      category,
      weights,
      images: allImages,
      tags,
      sku,
      stock,
      manufacturer,
    }

    addProduct(productData)
    revalidatePath("/admin/products")
    return { success: true, redirectTo: "/admin/products" }
  } catch (error) {
    return { error: "Failed to add product" }
  }
}

export async function updateProductAction(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const category = formData.get("category") as string
    const weights = (formData.get("weights") as string).split(",").map((w) => w.trim())
    const tags = formData.getAll("tags") as ("top-selling" | "best-selling" | "offer")[]
    const sku = formData.get("sku") as string
    const stock = formData.get("stock") ? Number.parseInt(formData.get("stock") as string) : undefined
    const manufacturer = formData.get("manufacturer") as string

    // Handle image uploads (same logic as add)
    const imageFiles = formData.getAll("imageFiles") as File[]
    const existingImages = formData.getAll("existingImages") as string[]

    const uploadedImagePaths: string[] = []

    for (const file of imageFiles) {
      if (file.size > 0) {
        try {
          const uploadedImage = await saveUploadedImage(file)
          uploadedImagePaths.push(uploadedImage.path)
        } catch (error) {
          console.error("Error uploading image:", error)
        }
      }
    }

    const allImages = [...existingImages, ...uploadedImagePaths]

    const productData: Partial<Omit<Product, "id" | "createdAt">> = {
      name,
      description,
      price,
      category,
      weights,
      images: allImages,
      tags,
      sku,
      stock,
      manufacturer,
    }

    const updated = updateProduct(id, productData)
    if (!updated) {
      return { error: "Product not found" }
    }

    revalidatePath("/admin/products")
    return { success: true, redirectTo: "/admin/products" }
  } catch (error) {
    return { error: "Failed to update product" }
  }
}

export async function deleteProductAction(id: number) {
  try {
    const deleted = deleteProduct(id)
    if (!deleted) {
      return { error: "Product not found" }
    }

    revalidatePath("/admin/products")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete product" }
  }
}

// Category Actions
export async function addCategoryAction(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string

    if (!name || !slug || !description) {
      return { error: "All fields are required" }
    }

    const categoryData: Omit<Category, "id" | "createdAt" | "updatedAt"> = {
      name,
      slug,
      description,
    }

    addCategory(categoryData)
    revalidatePath("/admin/categories")
    revalidatePath("/admin/products/add")
    revalidatePath("/admin/products/edit/[id]")
    return { success: true, redirectTo: "/admin/categories" }
  } catch (error) {
    return { error: "Failed to add category" }
  }
}

export async function updateCategoryAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string

    const categoryData: Partial<Omit<Category, "id" | "createdAt">> = {
      name,
      slug,
      description,
    }

    const updated = updateCategory(id, categoryData)
    if (!updated) {
      return { error: "Category not found" }
    }

    revalidatePath("/admin/categories")
    revalidatePath("/admin/products/add")
    revalidatePath("/admin/products/edit/[id]")
    return { success: true, redirectTo: "/admin/categories" }
  } catch (error) {
    return { error: "Failed to update category" }
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    const deleted = deleteCategory(id)
    if (!deleted) {
      return { error: "Category not found" }
    }

    revalidatePath("/admin/categories")
    revalidatePath("/admin/products/add")
    revalidatePath("/admin/products/edit/[id]")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete category" }
  }
}

// Customer Actions
export async function addCustomerAction(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const gstNumber = formData.get("gstNumber") as string
    const street = formData.get("street") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const pincode = formData.get("pincode") as string
    const country = formData.get("country") as string

    const customerData = {
      name,
      email: email || undefined,
      phone: phone || undefined,
      gstNumber: gstNumber || undefined,
      address: {
        street,
        city,
        state,
        pincode,
        country,
      },
    }

    // Validate customer data
    const validationErrors = validateCustomerData(customerData)
    if (validationErrors.length > 0) {
      return { error: validationErrors.join(", ") }
    }

    addCustomer(customerData)
    revalidatePath("/admin/billing/customers")
    return { success: true, redirectTo: "/admin/billing/customers" }
  } catch (error) {
    return { error: "Failed to add customer" }
  }
}

export async function updateCustomerAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const gstNumber = formData.get("gstNumber") as string
    const street = formData.get("street") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const pincode = formData.get("pincode") as string
    const country = formData.get("country") as string

    const customerData = {
      name,
      email: email || undefined,
      phone: phone || undefined,
      gstNumber: gstNumber || undefined,
      address: {
        street,
        city,
        state,
        pincode,
        country,
      },
    }

    // Validate customer data
    const validationErrors = validateCustomerData(customerData)
    if (validationErrors.length > 0) {
      return { error: validationErrors.join(", ") }
    }

    const updated = updateCustomer(id, customerData)
    if (!updated) {
      return { error: "Customer not found" }
    }

    revalidatePath("/admin/billing/customers")
    return { success: true, redirectTo: "/admin/billing/customers" }
  } catch (error) {
    return { error: "Failed to update customer" }
  }
}

export async function deleteCustomerAction(id: string) {
  try {
    const deleted = deleteCustomer(id)
    if (!deleted) {
      return { error: "Customer not found" }
    }

    revalidatePath("/admin/billing/customers")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete customer" }
  }
}

// Offline Product Actions
export async function addOfflineProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const basePrice = Number.parseFloat(formData.get("basePrice") as string)
    const category = formData.get("category") as string
    const tags = formData.getAll("tags") as ("top-selling" | "best-selling" | "offer")[]
    const sku = formData.get("sku") as string
    const stock = formData.get("stock") ? Number.parseInt(formData.get("stock") as string) : undefined
    const manufacturer = formData.get("manufacturer") as string
    const unitsJson = formData.get("units") as string

    // Handle image uploads
    const imageFiles = formData.getAll("imageFiles") as File[]
    const existingImages = formData.getAll("existingImages") as string[]

    const uploadedImagePaths: string[] = []

    // Process new image uploads
    for (const file of imageFiles) {
      if (file.size > 0) {
        try {
          const uploadedImage = await saveUploadedImage(file)
          uploadedImagePaths.push(uploadedImage.path)
        } catch (error) {
          console.error("Error uploading image:", error)
        }
      }
    }

    // Combine existing and new images
    const allImages = [...existingImages, ...uploadedImagePaths]

    if (!unitsJson) {
      return { error: "Units configuration is required" }
    }

    let units
    try {
      units = JSON.parse(unitsJson)
    } catch {
      return { error: "Invalid units configuration" }
    }

    const productData = {
      name,
      description,
      basePrice,
      category,
      units,
      images: allImages,
      tags,
      sku: sku || undefined,
      stock,
      manufacturer: manufacturer || undefined,
      isOfflineOnly: true,
    }

    // Validate offline product data
    const validationErrors = validateOfflineProductData(productData)
    if (validationErrors.length > 0) {
      return { error: validationErrors.join(", ") }
    }

    addOfflineProduct(productData)
    revalidatePath("/admin/offline-products")
    revalidatePath("/admin/billing")
    return { success: true, redirectTo: "/admin/offline-products" }
  } catch (error) {
    return { error: "Failed to add offline product" }
  }
}

export async function updateOfflineProductAction(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const basePrice = Number.parseFloat(formData.get("basePrice") as string)
    const category = formData.get("category") as string
    const tags = formData.getAll("tags") as ("top-selling" | "best-selling" | "offer")[]
    const sku = formData.get("sku") as string
    const stock = formData.get("stock") ? Number.parseInt(formData.get("stock") as string) : undefined
    const manufacturer = formData.get("manufacturer") as string
    const unitsJson = formData.get("units") as string

    // Handle image uploads (same logic as add)
    const imageFiles = formData.getAll("imageFiles") as File[]
    const existingImages = formData.getAll("existingImages") as string[]

    const uploadedImagePaths: string[] = []

    for (const file of imageFiles) {
      if (file.size > 0) {
        try {
          const uploadedImage = await saveUploadedImage(file)
          uploadedImagePaths.push(uploadedImage.path)
        } catch (error) {
          console.error("Error uploading image:", error)
        }
      }
    }

    const allImages = [...existingImages, ...uploadedImagePaths]

    let units
    try {
      units = JSON.parse(unitsJson)
    } catch {
      return { error: "Invalid units configuration" }
    }

    const productData = {
      name,
      description,
      basePrice,
      category,
      units,
      images: allImages,
      tags,
      sku: sku || undefined,
      stock,
      manufacturer: manufacturer || undefined,
    }

    // Validate offline product data
    const validationErrors = validateOfflineProductData(productData)
    if (validationErrors.length > 0) {
      return { error: validationErrors.join(", ") }
    }

    const updated = updateOfflineProduct(id, productData)
    if (!updated) {
      return { error: "Offline product not found" }
    }

    revalidatePath("/admin/offline-products")
    revalidatePath("/admin/billing")
    return { success: true, redirectTo: "/admin/offline-products" }
  } catch (error) {
    return { error: "Failed to update offline product" }
  }
}

export async function deleteOfflineProductAction(id: number) {
  try {
    const deleted = deleteOfflineProduct(id)
    if (!deleted) {
      return { error: "Offline product not found" }
    }

    revalidatePath("/admin/offline-products")
    revalidatePath("/admin/billing")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete offline product" }
  }
}

// Invoice Actions
export async function addInvoiceAction(formData: FormData) {
  try {
    const customerId = formData.get("customerId") as string
    const customerName = formData.get("customerName") as string
    const customerAddress = formData.get("customerAddress") as string
    const customerGST = formData.get("customerGST") as string
    const itemsJson = formData.get("items") as string
    const subtotal = Number.parseFloat(formData.get("subtotal") as string)
    const discount = Number.parseFloat(formData.get("discount") as string)
    const taxAmount = Number.parseFloat(formData.get("taxAmount") as string)
    const totalAmount = Number.parseFloat(formData.get("totalAmount") as string)
    const dueDate = new Date(formData.get("dueDate") as string)
    const notes = formData.get("notes") as string

    if (!customerId || !itemsJson) {
      return { error: "Customer and items are required" }
    }

    let items
    try {
      items = JSON.parse(itemsJson)
    } catch {
      return { error: "Invalid items data" }
    }

    const invoiceData: Omit<Invoice, "id" | "invoiceNumber" | "createdAt" | "updatedAt"> = {
      customerId,
      customerName,
      customerAddress,
      customerGST: customerGST || undefined,
      items,
      subtotal,
      discount,
      taxAmount,
      totalAmount,
      status: "draft",
      dueDate,
      notes: notes || undefined,
    }

    addInvoice(invoiceData)
    revalidatePath("/admin/billing/invoices")
    revalidatePath("/admin/billing")
    return { success: true, redirectTo: "/admin/billing/invoices" }
  } catch (error) {
    return { error: "Failed to create invoice" }
  }
}

export async function updateInvoiceAction(id: string, formData: FormData) {
  try {
    const customerId = formData.get("customerId") as string
    const customerName = formData.get("customerName") as string
    const customerAddress = formData.get("customerAddress") as string
    const customerGST = formData.get("customerGST") as string
    const itemsJson = formData.get("items") as string
    const subtotal = Number.parseFloat(formData.get("subtotal") as string)
    const discount = Number.parseFloat(formData.get("discount") as string)
    const taxAmount = Number.parseFloat(formData.get("taxAmount") as string)
    const totalAmount = Number.parseFloat(formData.get("totalAmount") as string)
    const dueDate = new Date(formData.get("dueDate") as string)
    const notes = formData.get("notes") as string

    let items
    try {
      items = JSON.parse(itemsJson)
    } catch {
      return { error: "Invalid items data" }
    }

    const invoiceData: Partial<Omit<Invoice, "id" | "createdAt">> = {
      customerId,
      customerName,
      customerAddress,
      customerGST: customerGST || undefined,
      items,
      subtotal,
      discount,
      taxAmount,
      totalAmount,
      dueDate,
      notes: notes || undefined,
    }

    const updated = updateInvoice(id, invoiceData)
    if (!updated) {
      return { error: "Invoice not found" }
    }

    revalidatePath("/admin/billing/invoices")
    revalidatePath("/admin/billing")
    return { success: true, redirectTo: "/admin/billing/invoices" }
  } catch (error) {
    return { error: "Failed to update invoice" }
  }
}

export async function deleteInvoiceAction(id: string) {
  try {
    const deleted = deleteInvoice(id)
    if (!deleted) {
      return { error: "Invoice not found" }
    }

    revalidatePath("/admin/billing/invoices")
    revalidatePath("/admin/billing")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete invoice" }
  }
}

// Payment Actions
export async function addPaymentAction(formData: FormData) {
  try {
    const invoiceId = formData.get("invoiceId") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const method = formData.get("method") as "cash" | "card" | "upi" | "bank_transfer" | "cheque"
    const reference = formData.get("reference") as string
    const date = new Date(formData.get("date") as string)
    const notes = formData.get("notes") as string

    if (!invoiceId || !amount || !method) {
      return { error: "Invoice, amount, and payment method are required" }
    }

    const paymentData: Omit<Payment, "id" | "createdAt"> = {
      invoiceId,
      amount,
      method,
      reference: reference || undefined,
      date,
      notes: notes || undefined,
    }

    addPayment(paymentData)
    revalidatePath("/admin/billing/payments")
    revalidatePath("/admin/billing/invoices")
    revalidatePath("/admin/billing")
    return { success: true, redirectTo: "/admin/billing/payments" }
  } catch (error) {
    return { error: "Failed to record payment" }
  }
}
