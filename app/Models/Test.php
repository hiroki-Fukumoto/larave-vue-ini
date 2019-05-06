<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Test extends Model
{
    use SoftDeletes;

    protected $table = 'tests';

    protected $casts = [
        'id' => 'string',
        'value' => 'string',
    ];

    protected $fillable = [
        'value'
    ];
}
