<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use App\Repository\PostRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
    public function index(EntityManagerInterface $em): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/PostController.php',
        ]);
    }

    #[Route('/api/post', name: 'app_add_post', methods: ["POST"])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {

        $data = $request->request->all();

        if (!isset($data["title"], $data['content'], $data["author_id"])) {
            return new JsonResponse(['messege' => 'Invalid Request'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository(User::class)->find($data["author_id"]);

        if (!$user) {
            return new JsonResponse(['messege' => 'Failed to find a user that requested'], JsonResponse::HTTP_NOT_FOUND);
        }

        $post = new Post();
        $post->setTitle($data["title"]);
        $post->setContent($data["content"]);
        $post->setAuthorId($user);

        $em->persist($post);
        $em->flush();
        
        return new JsonResponse(['messege' => 'New post has been created!'], JsonResponse::HTTP_CREATED);
    }
}
