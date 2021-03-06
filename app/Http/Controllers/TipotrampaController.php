<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Tipotrampa;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class TipotrampaController extends Controller
{
  public function __construct()
  {
      // Apply the jwt.auth middleware to all methods in this controller
      $this->middleware('jwt.auth');
  }

  public function index()
  {
    $tipotrampas = Tipotrampa::all();
    return $tipotrampas;
  }
}
