<?php
// router.php

// получаем запрашиваемый URL-адрес
$requestUri = $_SERVER['REQUEST_URI'];

// если URL-адрес содержит точку, то это файл (css, js, картинка и т.д.), пропускаем его
if (strpos($requestUri, '.') !== false) {
    return false;
}

// в остальных случаях перенаправляем на index.php
include_once __DIR__ . '/public/numberValidator.php';
