from django.contrib import admin
from .models import TypeMenu, Menu, MenuForParentTabs


@admin.register(TypeMenu)
class TypeMenu(admin.ModelAdmin):
    fields = ["menu_type"]
    list_display = ["menu_type"]
    search_fields = ["menu_type"]
    ordering = ["menu_type"]


@admin.register(MenuForParentTabs)
class MenuForParentTabs(admin.ModelAdmin):
    fields = ["parent"]
    list_display = ["parent"]
    readonly_fields = ["parent"]
    search_fields = ["parent"]
    ordering = ["parent"]


@admin.register(Menu)
class Menu(admin.ModelAdmin):
    fields = ["menu_type", "title", "slug", "parent", "level", "status"]
    list_display = ["menu_type", "title", "slug", "parent", "level", "status"]
    readonly_fields = ["status"]
    search_fields = ["title", "slug"]
    ordering = ["level"]
