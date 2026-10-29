#!/bin/bash
set -e

mkdir -p public/programs public/blog public/events public/mentors public/jobs public/courses public/paths

echo "Downloading Program assets..."
curl -s -L "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80" -o public/programs/scholarship.jpg
curl -s -L "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&auto=format&fit=crop&q=80" -o public/programs/incubation.jpg
curl -s -L "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&auto=format&fit=crop&q=80" -o public/programs/fasttrack.jpg
curl -s -L "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80" -o public/programs/fellowship.jpg

echo "Downloading Blog assets..."
curl -s -L "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80" -o public/blog/blog-1.jpg
curl -s -L "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&auto=format&fit=crop&q=80" -o public/blog/blog-2.jpg
curl -s -L "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=700&auto=format&fit=crop&q=80" -o public/blog/blog-3.jpg
curl -s -L "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80" -o public/blog/blog-4.jpg
curl -s -L "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80" -o public/blog/blog-5.jpg
curl -s -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80" -o public/blog/blog-6.jpg

echo "Downloading Event assets..."
curl -s -L "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&auto=format&fit=crop&q=80" -o public/events/event-1.jpg
curl -s -L "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=700&auto=format&fit=crop&q=80" -o public/events/event-2.jpg
curl -s -L "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=700&auto=format&fit=crop&q=80" -o public/events/event-3.jpg
curl -s -L "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&auto=format&fit=crop&q=80" -o public/events/event-4.jpg

echo "Downloading Mentor assets..."
curl -s -L "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" -o public/mentors/mentor-1.jpg
curl -s -L "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80" -o public/mentors/mentor-2.jpg
curl -s -L "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80" -o public/mentors/mentor-3.jpg
curl -s -L "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80" -o public/mentors/mentor-4.jpg
curl -s -L "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80" -o public/mentors/mentor-5.jpg

echo "Downloading Job assets..."
curl -s -L "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80" -o public/jobs/job-1.jpg
curl -s -L "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80" -o public/jobs/job-2.jpg
curl -s -L "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80" -o public/jobs/job-3.jpg
curl -s -L "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" -o public/jobs/job-4.jpg
curl -s -L "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80" -o public/jobs/job-5.jpg
curl -s -L "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80" -o public/jobs/job-6.jpg

echo "Downloading Course assets..."
curl -s -L "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" -o public/courses/fullstack.jpg
curl -s -L "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80" -o public/courses/web-dev.jpg
curl -s -L "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80" -o public/courses/python.jpg
curl -s -L "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80" -o public/courses/deep-learning.jpg
curl -s -L "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80" -o public/courses/devops-k8s.jpg
curl -s -L "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80" -o public/courses/cyber-security.jpg
curl -s -L "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80" -o public/courses/cloud-aws.jpg
curl -s -L "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80" -o public/courses/react-frontend.jpg
curl -s -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80" -o public/courses/data-science.jpg
curl -s -L "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80" -o public/courses/mobile-flutter.jpg
curl -s -L "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80" -o public/courses/genai-rag.jpg

echo "Downloading Learning Path assets..."
curl -s -L "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80" -o public/paths/ai-engineer.jpg
curl -s -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80" -o public/paths/data-science.jpg
curl -s -L "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&auto=format&fit=crop&q=80" -o public/paths/gen-ai.jpg
curl -s -L "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80" -o public/paths/mlops.jpg
curl -s -L "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80" -o public/paths/fullstack.jpg
curl -s -L "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=700&auto=format&fit=crop&q=80" -o public/paths/devops.jpg
curl -s -L "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80" -o public/paths/cybersecurity.jpg
curl -s -L "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=700&auto=format&fit=crop&q=80" -o public/paths/frontend.jpg
curl -s -L "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80" -o public/paths/backend.jpg
curl -s -L "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&auto=format&fit=crop&q=80" -o public/paths/mobile.jpg

echo "Asset download completed successfully!"
