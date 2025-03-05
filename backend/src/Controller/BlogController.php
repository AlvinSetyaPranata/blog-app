<?php

namespace App\Controller;

use App\Entity\Blog;
use App\Entity\User;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;

final class BlogController extends AbstractController
{

    private RequestStack $requestStack;

    public function __construct(RequestStack $requestStack) {
        $this->requestStack = $requestStack;
    }

    #[Route('/api/blogs', name: 'app_blog', methods: ['GET'])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $query = $em->getRepository(Blog::class)->findAll();

        $serializedData = $serializer->normalize($query, 'json', ['groups' => 'blog:read']);

        return new JsonResponse(['messege' => 'OK', 'data' => $serializedData], JsonResponse::HTTP_OK);
    }

    #[Route('/api/blogs/add', name: 'add_blog', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = $request->request->all();

        if (!isset($data["title"], $data["author"])) {
            return new JsonResponse(['messege' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository(User::class)->find($data["author"]);

        if (!$user) {
            return new JsonResponse(['messege' => 'User with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $blog = new Blog();
        $blog->setTitle($data["title"]);
        $blog->setAuthor($user);

        if (isset($data["content"])) {
            $blog->setContent($data["content"]);
        }

        $em->persist($blog);
        $em->flush();

        return new JsonResponse(['message' => 'User Created Successfully'], JsonResponse::HTTP_CREATED);
    }
}
