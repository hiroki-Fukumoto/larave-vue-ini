<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $table = 'tests';

    protected $casts = [
        'id' => 'string',
        'value' => 'string',
    ];
}
