# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: DATABASE for The MENU Component
# Result: Ready DATABASE for The MENU Component
#
# Past Modification: Editing The «Menu» CLASS (SAVE)
# Last Modification: Adding DOCUMENTATION
# Modification Date: 2024.03.06, 05:47 PM
#
# Create Date: 2024.03.05, 12:38 PM


from django.db import models
from django.template.defaultfilters import slugify


MAX_LENGTH = 28


class TypeMenu(models.Model):
    """
    TYPE of MENU for The «Menu» CLASS
    """

    class Meta:
        verbose_name = "Тип Меню"
        verbose_name_plural = "Типы Меню"

    menu_type = models.CharField(
        max_length=MAX_LENGTH,
        verbose_name="Тип",
        unique=True,
        blank=False
    )

    def __str__(self):
        return self.menu_type


class MenuForParentTabs(models.Model):
    """
    PARENT of SUBMENU for The «Menu» CLASS
    """

    class Meta:
        verbose_name = "Родительская Вкладка Меню"
        verbose_name_plural = "Родительские Вкладки Меню"

    parent = models.SlugField(
        max_length=MAX_LENGTH,
        verbose_name="Родитель Вкладки в Меню URL",
        unique=True,
        blank=False
    )

    def __str__(self):
        return self.parent


class Menu(models.Model):
    """
    Universal MENU
    """

    class Meta:
        verbose_name = "Меню"
        verbose_name_plural = "Меню"

    menu_type = models.ForeignKey(
        "TypeMenu",
        on_delete=models.PROTECT,
        verbose_name="Тип",
        blank=False
    )
    title = models.CharField(
        max_length=MAX_LENGTH,
        verbose_name="Название",
        unique=True,
        blank=False
    )
    slug = models.SlugField(
        max_length=MAX_LENGTH,
        verbose_name="Название для URL",
        unique=True,
        blank=False
    )
    parent = models.ForeignKey(
        "MenuForParentTabs",
        on_delete=models.PROTECT,
        verbose_name="Родитель",
        blank=True,
        null=True
    )
    level = models.SmallIntegerField(
        verbose_name="Уровень",
        unique=True,
        blank=False
    )
    status = models.BooleanField(verbose_name="Статус", default=False)

    def __str__(self):
        return self.title + " | " + self.slug

    def save(self, *args, **kwargs):
        if len(self.slug) <= 0:
            self.slug = slugify(self.title)
        self.slug = self.slug.lower()

        menu_parent_tab = MenuForParentTabs.objects.get_or_create(
            parent=self.slug
        )
        if not menu_parent_tab:
            menu_parent_tab.save()

        super().save(*args, **kwargs)
