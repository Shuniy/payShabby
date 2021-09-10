# rest framwework
from rest_framework.response import Response
from rest_framework.decorators import api_view

# local imports
from base.models import Product
from base.serializers import ProductSerializer

# views

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)
