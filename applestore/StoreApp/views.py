from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Product,Cart
from .serializers import ProductSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password,make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def get_products(request):
    """
    API view to get all products.
    """
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    """
    API view to get a single product with its images.
    """
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['POST'])
def add_product(request):
    """
    API view to create a new product.
    """
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_product(request, pk):
    """
    API view to update an existing product.
    """
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_product(request, pk):
    """
    API view to delete an existing product.
    """
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def login_view(request):
    print("sdklfjls")

    email = request.data.get('email')
    password = request.data.get('password')

    print(request.data)

    if not email or not password:
        return Response(
            {"error": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
        if not check_password(password, user.password):
            return Response(
                {"error": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK
        )
    except User.DoesNotExist:
        return Response(
            {"error": "User not found."},
            status=201
        )



# -------user registration section--------

@api_view(['POST'])
def register_view(request):
    # -----Register a new user ------
    username = request.data.get('name')
    email=request.data.get('email')
    password=request.data.get('password')

    if not username or not email or not password:
        return Response(
            {"error":"Username, email, and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    if User.objects.filter(email=email).exists():
        return Response(
            {"error":"A user with this email already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
    if User.objects.filter(username=username).exists():
        return Response(
            {"error":"A user with this username already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
    User.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )
    print(("Hello"))
    return Response(
        {"message":"User registered successfully."},
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request, pk):
    cart_model=Cart()

    product = Product.objects.get(pk=pk)
    user=request.user
    try:
        cart_objects=Cart.objects.get(product=product,user=user)
        if request.data.get('quantity'):
            cart_objects.quantity = cart_objects.quantity + int(request.data.get('quantity'))
        else:
            cart_objects.quantity = cart_objects.quantity +1
        cart_objects.save()
        return Response("Product Added to cart ")
    except Cart.DoesNotExist:
        cart_model.product=product
        cart_model.user=user
        cart_model.save()
        return Response("Product Added to cart ")





from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, Product

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, pk):
    """
    Deletes a specific cart item for the authenticated user.
    """
    user = request.user  # Get the authenticated user
    product = get_object_or_404(Product, pk=pk)  # Retrieve the product

    try:
        # Attempt to find the cart item for the user and product
        cart_item = Cart.objects.get(product=product, user=user)
        cart_item.delete()  # Delete the cart item
        return Response("Product removed from cart successfully.")
    except Cart.DoesNotExist:
        # If the cart item doesn't exist, return an error response
        return Response("Product not found in cart.", status=404)
