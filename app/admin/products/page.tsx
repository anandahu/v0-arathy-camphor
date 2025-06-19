import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Filter, Package } from "lucide-react"
import Link from "next/link"
import { getAllProducts } from "@/lib/products"
import Image from "next/image"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"
import DeleteProductButton from "@/components/admin/delete-product-button"

async function checkAuth() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")

    if (!session || session.value !== "authenticated") {
      redirect("/admin/login")
    }
  } catch (error) {
    redirect("/admin/login")
  }
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; filter?: string }
}) {
  await checkAuth()

  const allProducts = getAllProducts()

  // Filter products based on search params
  let products = allProducts
  let filterTitle = "All Products"

  if (searchParams.category) {
    products = allProducts.filter((p) => p.category === searchParams.category)
    filterTitle = `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)} Products`
  }

  if (searchParams.filter) {
    products = allProducts.filter((p) => p.tags.includes(searchParams.filter as any))
    filterTitle = `${searchParams.filter.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Products`
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "top-selling":
        return "bg-green-100 text-green-800"
      case "best-selling":
        return "bg-blue-100 text-blue-800"
      case "offer":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600">Manage your product catalog with categories and tags</p>
              {(searchParams.category || searchParams.filter) && (
                <div className="flex items-center mt-2">
                  <Filter className="h-4 w-4 mr-2 text-amber-600" />
                  <span className="text-sm text-amber-700">Filtered: {filterTitle}</span>
                  <Button asChild variant="link" size="sm" className="ml-2 text-amber-600">
                    <Link href="/admin/products">Clear Filter</Link>
                  </Button>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button asChild variant="outline">
                <Link href="/admin/dashboard">Back to Dashboard</Link>
              </Button>
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/admin/products/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    asChild
                    variant={!searchParams.category && !searchParams.filter ? "default" : "outline"}
                    size="sm"
                  >
                    <Link href="/admin/products">All Products</Link>
                  </Button>
                  <Button asChild variant={searchParams.category === "agarbathi" ? "default" : "outline"} size="sm">
                    <Link href="/admin/products?category=agarbathi">Agarbathi</Link>
                  </Button>
                  <Button asChild variant={searchParams.category === "camphor" ? "default" : "outline"} size="sm">
                    <Link href="/admin/products?category=camphor">Camphor</Link>
                  </Button>
                  <Button asChild variant={searchParams.filter === "top-selling" ? "default" : "outline"} size="sm">
                    <Link href="/admin/products?filter=top-selling">Top Selling</Link>
                  </Button>
                  <Button asChild variant={searchParams.filter === "best-selling" ? "default" : "outline"} size="sm">
                    <Link href="/admin/products?filter=best-selling">Best Selling</Link>
                  </Button>
                  <Button asChild variant={searchParams.filter === "offer" ? "default" : "outline"} size="sm">
                    <Link href="/admin/products?filter=offer">On Offer</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {searchParams.category || searchParams.filter ? "Filtered" : "Total"} Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">
                  {searchParams.category || searchParams.filter ? `of ${allProducts.length} total` : "in catalog"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Selling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {products.filter((p) => p.tags.includes("top-selling")).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Best Selling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {products.filter((p) => p.tags.includes("best-selling")).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">On Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.filter((p) => p.tags.includes("offer")).length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {filterTitle} ({products.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchParams.category || searchParams.filter
                      ? "No products match the current filter."
                      : "Get started by adding your first product."}
                  </p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link href="/admin/products/add">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Product
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Image</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Tags</th>
                        <th className="text-left py-3 px-4">Weights</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="capitalize">
                              {product.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-medium">₹{product.price}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {product.tags.map((tag) => (
                                <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
                                  {tag.replace("-", " ")}
                                </Badge>
                              ))}
                              {product.tags.length === 0 && <span className="text-gray-400 text-sm">No tags</span>}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{product.weights.join(", ")}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/products/${product.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/admin/products/edit/${product.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <DeleteProductButton productId={product.id} productName={product.name} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
