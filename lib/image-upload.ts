export interface UploadedImage {
  id: string
  filename: string
  originalName: string
  path: string
  size: number
  mimeType: string
  uploadedAt: Date
}

// In-memory storage for uploaded images
const uploadedImages: UploadedImage[] = []
let nextImageId = 1

export function saveUploadedImage(file: File): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    try {
      // In a real application, you would save the file to disk or cloud storage
      // For this demo, we'll simulate the upload process

      const fileExtension = file.name.split(".").pop() || "jpg"
      const filename = `product-${nextImageId++}-${Date.now()}.${fileExtension}`
      const path = `/uploads/products/${filename}`

      const uploadedImage: UploadedImage = {
        id: `img-${nextImageId}`,
        filename,
        originalName: file.name,
        path,
        size: file.size,
        mimeType: file.type,
        uploadedAt: new Date(),
      }

      uploadedImages.push(uploadedImage)

      // Simulate async upload
      setTimeout(() => {
        resolve(uploadedImage)
      }, 1000)
    } catch (error) {
      reject(error)
    }
  })
}

export function deleteUploadedImage(id: string): boolean {
  const index = uploadedImages.findIndex((img) => img.id === id)
  if (index === -1) return false

  uploadedImages.splice(index, 1)
  return true
}

export function getUploadedImageById(id: string): UploadedImage | undefined {
  return uploadedImages.find((img) => img.id === id)
}

export function getAllUploadedImages(): UploadedImage[] {
  return uploadedImages
}

// File validation
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, and WebP images are allowed" }
  }

  if (file.size > maxSize) {
    return { valid: false, error: "Image size must be less than 5MB" }
  }

  return { valid: true }
}

// Convert File to base64 for preview
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}
