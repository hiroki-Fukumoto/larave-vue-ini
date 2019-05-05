<?php

namespace App\Services;

use App\Repositories\TestRepository;

class TestService
{
    protected $testRepository;

    /**
     * __construct
     *
     * @param  mixed $testRepository
     *
     * @return void
     */
    public function __construct(TestRepository $testRepository)
    {
        $this->testRepository = $testRepository;
    }

    /**
     * getList
     *
     * @return void
     */
    public function getList()
    {
        return $this->testRepository->getList();
    }

    /**
     * getDetail
     *
     * @param  int $id
     *
     * @return void
     */
    public function getDetail($id)
    {
        return $this->testRepository->getDetail($id);
    }
}