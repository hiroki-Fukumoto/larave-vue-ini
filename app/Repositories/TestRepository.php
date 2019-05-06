<?php

namespace App\Repositories;

use App\Models\Test;
use DB;

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
        return $this->test->paginate();
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
        $item = $this->test::find($id);
        return $item ?? abort(404);
    }

    /**
     * createItem
     *
     * @param  mixed $request
     *
     * @return void
     */
    public function createItem($request)
    {
        $item = new $this->test;

        DB::beginTransaction();
        try {
            $item->fill($request->all())->save();
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
        return response($item, 201);
    }

    /**
     * updateItem
     *
     * @param  mixed $request
     * @param  mixed $id
     *
     * @return void
     */
    public function updateItem($request, $id)
    {
        $item = $this->test::find($id);

        if (!$item) {
            abort(404);
        }

        DB::beginTransaction();
        try {
            $item->fill($request->all())->save();
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
        return response($item, 200);
    }

    /**
     * deleteItem
     *
     * @param  mixed $id
     *
     * @return void
     */
    public function deleteItem($id)
    {
        $item = $this->test::find($id);

        if (!$item) {
            abort(404);
        }

        DB::beginTransaction();
        try {
            $item->delete();
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
        return response('', 200);
    }
}