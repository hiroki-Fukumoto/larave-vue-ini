<?php

use Illuminate\Http\Request;

// ユーザー登録
Route::post('/register', 'Auth\RegisterController@register')->name('register');
// ログイン
Route::post('/login', 'Auth\LoginController@login')->name('login');

// トークンリフレッシュ
Route::get('/reflesh-token', function (Illuminate\Http\Request $request) {
    $request->session()->regenerateToken();

    return response()->json();
});

// 認証後にアクセス可能API
Route::group(['middleware' => 'auth'], function () {
    // ログアウト
    Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
    // ログインユーザー
    Route::get('/user', function () {
        return Auth::user();
    })->name('user');

    // テストデータ
    Route::get('/tests', 'Api\TestController@index')->name('test.index');
    Route::get('/tests/{id}', 'Api\TestController@show')->name('test.show');
    Route::post('/tests', 'Api\TestController@store')->name('test.store');
    Route::patch('/tests/{id}', 'Api\TestController@update')->name('test.update');
    Route::delete('/tests/{id}', 'Api\TestController@delete')->name('test.delete');
});
