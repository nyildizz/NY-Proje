#!/bin/bash

# Proje dizinine git
cd "c:\Users\NY\Desktop\NY-Proje"

# Değişiklikleri staging area'ya ekle
git add .

# Değişiklikleri commit'le
git commit -m "GitHub güncelleme - %date%"

# Değişiklikleri GitHub'a gönder
git push origin main