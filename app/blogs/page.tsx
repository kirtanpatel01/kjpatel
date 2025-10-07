import Card from "@/components/card"

export default function page() {
  const dummyData = [
    // Dev
    {
      id: 1,
      date: "Dev | 12 Nov",
      title: "How to work with Express",
      subtitle: "A brief introduction about Express",
      image: "https://media.geeksforgeeks.org/wp-content/uploads/20240118183847/what-is-software-development-768.webp"
    },
    {
      id: 2,
      date: "Dev | 20 Nov",
      title: "Node.js Best Practices",
      subtitle: "Write cleaner and scalable backend code",
      image: "https://dreamlight.com/wp/wp-content/uploads/nodejs-new-pantone-black.png"
    },
    {
      id: 3,
      date: "Dev | 28 Nov",
      title: "Intro to REST APIs",
      subtitle: "Learn how RESTful services work",
      image: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/2147485434/images/7d8522f-3343-70d6-3234-7d8ea88ce2_rest-api-model-http-request-response.webp"
    },

    // Tech
    {
      id: 4,
      date: "Tech | 18 Nov",
      title: "Understanding React Server Components",
      subtitle: "Why RSCs are the future of React apps",
      image: "https://s3.amazonaws.com/angularminds.com/blog/cover/React%20Server%20Components_%20A%20Comprehensive%20Guide-20240926091742980.jpg"
    },
    {
      id: 5,
      date: "Tech | 22 Nov",
      title: "Next.js App Router Guide",
      subtitle: "Everything you need to know about the App Router",
      image: "https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fterminology-component-tree.png&w=1920&q=75"
    },
    {
      id: 6,
      date: "Tech | 29 Nov",
      title: "WebAssembly Basics",
      subtitle: "Run fast code on the web with WASM",
      image: "https://webassembly.org/css/webassembly.svg"
    },

    // JS
    {
      id: 7,
      date: "JS | 25 Nov",
      title: "Mastering Async/Await",
      subtitle: "Simplify your JavaScript promises",
      image: "https://ik.imagekit.io/ably/ghost/prod/2021/12/ably-js-async-await@2x.png?tr=w-1728,q-50"
    },
    {
      id: 8,
      date: "JS | 30 Nov",
      title: "Closures in JavaScript",
      subtitle: "A deep dive into closures and lexical scope",
      image: "https://dmitripavlutin.com/static/00b6ed6d91a74c2e4ca5096e2d541dd7/59014/cover-5.png"
    },
    {
      id: 9,
      date: "JS | 05 Dec",
      title: "JavaScript Event Loop Explained",
      subtitle: "How JS handles concurrency",
      image: "https://api.frontendlead.com/wp-content/uploads/2024/03/Javascript-event-loop.png"
    },

    // AI
    {
      id: 10,
      date: "AI | 02 Dec",
      title: "Getting Started with OpenAI API",
      subtitle: "Build smarter apps with AI",
      image: "https://resize.latenode.com/cdn-cgi/image/width=960,format=auto,fit=scale-down/https://cdn.prod.website-files.com/62c40e4513da320b60f32941/66a8c2101a1569bd7cc9b00c_%D0%A1%D0%9C%D0%98%20(4)-p-1080.jpg"
    },
    {
      id: 11,
      date: "AI | 08 Dec",
      title: "Intro to Machine Learning",
      subtitle: "Understand the basics of ML models",
      image: "https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2019/04/Importance-Of-Machine-Learning-Introduction-To-Machine-Learning-Edureka.png"
    },
    {
      id: 12,
      date: "AI | 12 Dec",
      title: "AI in Everyday Apps",
      subtitle: "How AI is shaping our daily lives",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*AGFLWBaFLSV285ei"
    },

    // DevOps
    {
      id: 13,
      date: "DevOps | 10 Dec",
      title: "Docker Basics",
      subtitle: "Containerize your applications with ease",
      image: "https://www.whizlabs.com/blog/wp-content/uploads/2019/08/docker-fundamentals.png"
    },
    {
      id: 14,
      date: "DevOps | 14 Dec",
      title: "Kubernetes 101",
      subtitle: "Scaling apps with Kubernetes",
      image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fefj4eq30q56ute916yfi.png"
    },
    {
      id: 15,
      date: "DevOps | 18 Dec",
      title: "CI/CD Pipelines Explained",
      subtitle: "Automating your deployments",
      image: "https://www.blackduck.com/glossary/what-is-cicd/_jcr_content/root/synopsyscontainer/column_1946395452_co/colRight/image_copy.coreimg.svg/1727199377195/cicd.svg"
    },

    // UI/UX
    {
      id: 16,
      date: "UI/UX | 15 Dec",
      title: "Designing Accessible Interfaces",
      subtitle: "Why accessibility matters in modern apps",
      image: "https://media.geeksforgeeks.org/wp-content/uploads/20230926172158/Accessibility-in-UI-UX-Design.png"
    },
    {
      id: 17,
      date: "UI/UX | 20 Dec",
      title: "Dark Mode Best Practices",
      subtitle: "Designing for comfort and usability",
      image: "https://www.spinxdigital.com/app/uploads/2024/02/Best-Practices-for-Dark-Mode-What-to-Do-and-Avoid-in-Dark-UI.jpg"
    },
    {
      id: 18,
      date: "UI/UX | 24 Dec",
      title: "Microinteractions in UX",
      subtitle: "Make your design feel alive",
      image: "https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F5773994%2Fcover_image%2Fretina_500x200%2F0422_Ecommerce_microinteractions_Zara_Newsletter___blog-8f7d313516e9fd6a4d7b7124e09dda3c.png"
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 p-4 sm:p-8">
      {dummyData.map((item, id) => (
        <Card
          key={id}
          id={id}
          date={item.date}
          title={item.title}
          subtitle={item.subtitle}
          image={item.image}
        />
      ))}
    </div>
  )
}
