<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // membuat beberapa role
        // membuat default user untuk super admin / owner

        $adminRole = Role::create(([
            'name' => 'admin'
        ]));

        $userRole = Role::create(([
            'name' => 'user'
        ]));

        // akun super admin untuk mengelola data awal
        // e.g. data category, class, etc.

        $userAdmin = User::create([
            'name' => 'Admin Krsstr',
            'email' => 'admin@gmail.com',
            'password' => 'devadmin',
        ]);
        
        $userAcc = User::create([
            'name' => 'User Krsstr',
            'email' => 'user@gmail.com',
            'password' => 'user123',
        ]);

        // assign role 
        $userAdmin->assignRole($adminRole);
        $userAcc->assignRole($userRole);
    }
}
