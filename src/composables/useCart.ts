import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  category: string
}

export function useCart() {

  const cartItems = ref<CartItem[]>([])


  const loadCart = () => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      cartItems.value = JSON.parse(saved)
    }
  }


  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const isEmpty = computed(() => {
    return cartItems.value.length === 0
  })


  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
    
    saveCart()
  }

  const removeFromCart = (id: number) => {
    const index = cartItems.value.findIndex(item => item.id === id)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
      saveCart()
    }
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    const item = cartItems.value.find(item => item.id === id)
    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(id)
      } else {
        item.quantity = newQuantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    localStorage.removeItem('cart')
  }

  const isInCart = (productId: number) => {
    return cartItems.value.some(item => item.id === productId)
  }


  loadCart()

  return {
    cartItems,
    totalItems,
    totalPrice,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart
  }
}