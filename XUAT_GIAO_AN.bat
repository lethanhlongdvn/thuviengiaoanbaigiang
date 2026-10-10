@echo off
chcp 65001 > nul
title HỆ THỐNG XUẤT KẾ HOẠCH BÀI DẠY THEO TUẦN
cd /d "%~dp0"
python tools\interactive_export.py
pause
