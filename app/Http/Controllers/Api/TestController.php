<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\TestRequest;
use App\Http\Controllers\Controller;
use App\Services\TestService;

class TestController extends Controller
{
    protected $testService;
    public function __construct(TestService $test_service)
    {
        $this->testService = $test_service;
    }


    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        return $this->testService->getList();
    }

    /**
     * show
     *
     * @param  int $id
     *
     * @return void
     */
    public function show(int $id)
    {
        return $this->testService->getDetail($id);
    }

    /**
     * store
     *
     * @param  mixed $request
     *
     * @return void
     */
    public function store(TestRequest $request)
    {
        return $this->testService->createItem($request);
    }

    /**
     * update
     *
     * @param  mixed $request
     *
     * @return void
     */
    public function update(TestRequest $request, $id)
    {
        return $this->testService->updateItem($request, $id);
    }

    
    /**
     * delete
     *
     * @param  mixed $id
     *
     * @return void
     */
    public function delete($id)
    {
        return $this->testService->deleteItem($id);
    }
}
