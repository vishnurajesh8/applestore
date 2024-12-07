from django.db import models
from django.contrib.auth.models import User

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# Product Model
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def is_in_stock(self):
        """Check if product is in stock."""
        return self.stock_quantity > 0

    def update_stock(self, quantity):
        """Update stock quantity after an order."""
        self.stock_quantity -= quantity
        self.save()


# Product Image Model
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="product_images/")
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.product.name}"


# Cart Model
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart for {self.user.username}"

    def total_price(self):
        """Calculate the total price of all items in the cart."""
        total = sum(item.total_item_price() for item in self.items.all())
        return total

    def add_item(self, product, quantity):
        """Add a product to the cart."""
        item, created = self.items.get_or_create(product=product)
        if not created:
            item.quantity += quantity
        item.save()

    def remove_item(self, product):
        """Remove a product from the cart."""
        item = self.items.filter(product=product).first()
        if item:
            item.delete()

    def clear_cart(self):
        """Clear all items from the cart."""
        self.items.all().delete()


# Cart Item Model
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

    def total_item_price(self):
        """Calculate the price of this cart item."""
        return self.product.price * self.quantity


# Order Model
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255, default="Pending")
    shipping_address = models.TextField()
    payment_status = models.CharField(max_length=100, choices=[('Pending', 'Pending'), ('Completed', 'Completed')])
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id} for {self.user.username}"

    def calculate_total_amount(self):
        """Calculate the total amount for the order."""
        self.total_amount = sum(item.total_item_price() for item in self.cart.items.all())
        self.save()

    def mark_as_completed(self):
        """Mark order as completed."""
        self.status = "Completed"
        self.save()
