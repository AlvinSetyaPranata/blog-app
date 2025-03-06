<?php

namespace App\Repository;

use App\Entity\Blog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Blog>
 */
class BlogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Blog::class);
    }

    public function findByCategoryName(string $categoryName): ?Blog
    {
        return $this->createQueryBuilder('b')
            ->innerJoin('b.categories', 'c')
            ->where('c.name = :categoryName')
            ->setParameter('categoryName', $categoryName)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }



    //    public function findOneBySomeField($value): ?Blog
    //    {
    //        return $this->createQueryBuilder('b')
    //            ->andWhere('b.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
