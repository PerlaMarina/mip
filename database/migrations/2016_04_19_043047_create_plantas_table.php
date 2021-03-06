<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlantasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('plantas', function (Blueprint $table) {
         $table->increments('id');
         $table->string('name')->unique();
         $table->string('cssclass');
         $table->string('description')->nullable();
         $table->timestamps();
     });
   }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('plantas');
    }
}
