from django.db import models

# Model Pelanggan
class Pelanggan(models.Model):
    nama_pelanggan = models.CharField(max_length=255)
    alamat = models.TextField()
    nomor_telepon = models.CharField(max_length=15)

    def __str__(self):
        return self.nama_pelanggan

# Model Menu
class Menu(models.Model):
    KATEGORI_CHOICES = [
        ('makanan', 'Makanan'),
        ('minuman', 'Minuman'),
    ]
    nama_menu = models.CharField(max_length=255)
    kategori = models.CharField(max_length=50, choices=KATEGORI_CHOICES)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    deskripsi = models.TextField()

    def __str__(self):
        return self.nama_menu

# Model Pemesanan
class Pemesanan(models.Model):
    STATUS_CHOICES = [
        ('belum diproses', 'Belum Diproses'),
        ('sedang diproses', 'Sedang Diproses'),
        ('selesai', 'Selesai'),
    ]
    pelanggan = models.ForeignKey(Pelanggan, on_delete=models.CASCADE)
    menu = models.ManyToManyField(Menu)  # Relasi Many-to-Many dengan Menu
    tanggal_pemesanan = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    total_harga = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Pemesanan {self.id} oleh {self.pelanggan.nama_pelanggan}"