from rest_framework import serializers
from .models import Pelanggan, Menu, Pemesanan

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'nama_menu', 'kategori', 'harga', 'deskripsi']

class PelangganSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelanggan
        fields = ['id', 'nama_pelanggan', 'alamat', 'nomor_telepon']

class PemesananSerializer(serializers.ModelSerializer):
    pelanggan = serializers.PrimaryKeyRelatedField(queryset=Pelanggan.objects.all())
    menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all(), many=True)
    class Meta:
        model = Pemesanan
        fields = ['id', 'pelanggan', 'menu', 'tanggal_pemesanan', 'status', "total_harga"]