<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{

    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        // Create superadmin
        $superadmin = new User();
        $superadmin->setEmail("admin@email.com");
        
        $superadmin_passw = $this->hasher->hashPassword($superadmin, "admin12345");
        $superadmin->setPassword($superadmin_passw);
        $superadmin->setRoles(["ROLE_SUPERADMIN"]);

        // Create Admin
        $admin = new User();
        $admin->setEmail('admin@example.com');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPassword($this->hasher->hashPassword($admin, 'password123'));

        // Create Normal User
        $user = new User();
        $user->setEmail('user@example.com');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($this->hasher->hashPassword($user, 'password123'));

        
        $manager->persist($superadmin);
        $manager->persist($admin);
        $manager->persist($user);

        
        $manager->flush();
    }
}
