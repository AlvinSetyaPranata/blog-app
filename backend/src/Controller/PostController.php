<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

final class PostController extends AbstractController
{
    private RequestStack $requestStack;

    public function __construct(RequestStack $requestStack) {
        $this->requestStack = $requestStack;
    }

    #[Route('/api/post', name: 'app_post', methods: ["GET"])]
    public function index(PostRepository $repository): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/PostController.php',
        ]);
    }

    #[Route('/api/post', name: 'app_add_post', methods: ["POST"])]
    public function create(EntityManagerInterface $em): JsonResponse
    {

        $data = json_decode($this->requestStack->getCurrentRequest(), true);

        if (!isset($data["title"], $data["author_id"])) {
            return new JsonResponse(['messege' => 'Invalid Request'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $post = new Post();
        $post->setTitle($data["title"]);
        $post->setAuthorId($data["author"]);

        $em->persist($post);
        $em->flush();
        
        return new JsonResponse(['messege' => 'New post has been created!'], JsonResponse::HTTP_CREATED);
    }
}
