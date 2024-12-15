from rest_framework import serializers
from .models import Pelanggan, Menu, Pemesanan, Transaksi

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'nama_menu', 'kategori', 'harga', 'deskripsi']

class PelangganSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelanggan
        fields = ['id', 'nama_pelanggan', 'alamat', 'nomor_telepon']

class PemesananSerializer(serializers.ModelSerializer):
    pelanggan = PelangganSerializer()
    menu = MenuSerializer(many=True)

    class Meta:
        model = Pemesanan
        fields = ['id', 'pelanggan', 'menu', 'tanggal_pemesanan', 'status']

class TransaksiSerializer(serializers.ModelSerializer):
    pemesanan = PemesananSerializer()
    class Meta:
        model = Transaksi
        fields = ['id', 'pemesanan', 'total_harga', 'metode_pembayaran', 'tanggal_transaksi']