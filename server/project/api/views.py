from rest_framework import viewsets
from .models import Pelanggan, Menu, Pemesanan
from .serializers import PelangganSerializer, MenuSerializer, PemesananSerializer

class PelangganViewSet(viewsets.ModelViewSet):
    queryset = Pelanggan.objects.all()
    serializer_class = PelangganSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class PemesananViewSet(viewsets.ModelViewSet):
    queryset = Pemesanan.objects.all()
    serializer_class = PemesananSerializer
    
    def perform_create(self, serializer):
        serializer.save()