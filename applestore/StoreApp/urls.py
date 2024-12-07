from django.urls import path
from .views import get_products, get_product, add_product, update_product, delete_product, login_view,register_view, add_to_cart, delete_cart_item
urlpatterns = [

    path('products/', get_products, name='product-list'),
    path('products/<int:pk>/', get_product, name='product-detail'),
    path('products/add/', add_product, name='product-add'),
    path("login",login_view),
    path('signup/', register_view, name='signup'),
    path('products/<int:pk>/update/', update_product, name='product-update'),
    path('products/<int:pk>/delete/', delete_product, name='product-delete'),
    path('add_to_cart/<int:pk>/',add_to_cart),
    path('delete_cart/<int:id>/', delete_cart_item, name='delete_cart'),



]
