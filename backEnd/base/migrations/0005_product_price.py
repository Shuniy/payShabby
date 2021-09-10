# Generated by Django 3.2.4 on 2021-09-07 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=21),
        ),
    ]
