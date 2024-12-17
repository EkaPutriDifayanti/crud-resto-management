from django.contrib import admin
from .models import Pelanggan, Menu, Pemesanan

# Register Pelanggan Model
class PelangganAdmin(admin.ModelAdmin):
    list_display = ('nama_pelanggan', 'alamat', 'nomor_telepon')
    search_fields = ['nama_pelanggan', 'nomor_telepon']

admin.site.register(Pelanggan, PelangganAdmin)

# Register Menu Model
class MenuAdmin(admin.ModelAdmin):
    list_display = ('nama_menu', 'kategori', 'harga', 'deskripsi')
    search_fields = ['nama_menu']
    list_filter = ('kategori',)

admin.site.register(Menu, MenuAdmin)

# Register Pemesanan Model
class PemesananAdmin(admin.ModelAdmin):
    list_display = ('pelanggan', 'status', 'tanggal_pemesanan')
    search_fields = ['pelanggan__nama_pelanggan']
    list_filter = ('status',)
    filter_horizontal = ('menu',)

admin.site.register(Pemesanan, PemesananAdmin)