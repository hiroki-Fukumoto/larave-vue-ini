<?php

namespace App\Repositories;

use App\Models\Test;
 
class TestRepository
{
    protected $test;

    /**
    * TestRepository constructor.
    * @param $test
    */
    public function __construct(Test $test)
    {
        $this->test = $test;
    }


    /**
     * getList
     *
     * @return void
     */
    public function getList()
    {
        return $this->test->all();
    }


    /**
     * getDetail
     *
     * @param  mixed $id
     *
     * @return void
     */
    public function getDetail($id)
    {
        $item = $this->test->where('id', $id)->first();
        return $item ?? abort(404);
    }
}