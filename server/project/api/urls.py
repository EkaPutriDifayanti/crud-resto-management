from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'pelanggan', views.PelangganViewSet)
router.register(r'menu', views.MenuViewSet)
router.register(r'pemesanan', views.PemesananViewSet)
router.register(r'transaksi', views.TransaksiViewSet)

urlpatterns = [
    path('', include(router.urls)),
]