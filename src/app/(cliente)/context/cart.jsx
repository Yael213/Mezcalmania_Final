'use client'
import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCartItems = localStorage.getItem('cartItems')
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems))
      }
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
  }, [cartItems, loading])

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, cantidadUsuario: cartItem.cantidadUsuario + 1 }
            : cartItem
        )
      )
    } else {
      setCartItems([...cartItems, { ...item, cantidadUsuario: 1 }])
    }
  }

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)

    if (isItemInCart.cantidadUsuario === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id))
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, cantidadUsuario: cartItem.cantidadUsuario - 1 }
            : cartItem
        )
      )
    }
  }

  const setQuantityProduct = (item, quantity) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)

    if (isItemInCart) {
      if (quantity <= 0) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id))
        return
      }
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, cantidadUsuario: quantity }
            : cartItem
        )
      )
    }
  }

  const addQuantityProduct = (item, quantity) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                cantidadUsuario: cartItem.cantidadUsuario + quantity,
              }
            : cartItem
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cantidadUsuario, 0)
  }

  if (loading) {
    return null
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotalItems,
        setQuantityProduct,
        addQuantityProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
