<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('dashboard');
});

Route::get('/login', function () {
    return view('login');
});

// Authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/user', [AuthController::class, 'user'])->name('user');

Route::get('/home', [StudentController::class, 'index']);
Route::get('/react-home', function () {
    return view('react-home');
});
Route::post('/students', [StudentController::class, 'store'])->name('students.store');

Route::get('/example/{any?}', function () {
    return view('example');
})->where('any', '^(?!api).*$');

// Password change routes (protected by auth middleware)
Route::middleware(['auth'])->group(function () {
    Route::post('/change-password', [PasswordController::class, 'changePassword'])->name('password.change');
    Route::post('/validate-password', [PasswordController::class, 'validatePassword'])->name('password.validate');
});