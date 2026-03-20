import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import OptimizedImage from "./OptimizedImage";

const carouselImages = [
  { src: "/diagramacao-ilustracao.png", alt: "Ilustração litúrgica detalhada" },
  { src: "/diagramacao-texto.png", alt: "Página de texto explicativo" },
  { src: "/interno.jpg", alt: "Páginas internas do livro" },
  { src: "/imagens7.png", alt: "Ilustração do livro - página 7" },
  { src: "/imagens8.png", alt: "Ilustração do livro - página 8" },
  { src: "/imagens10.png", alt: "Ilustração do livro - página 10" },
];

const IllustrationsCarousel = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[hsl(var(--primary-background-color))] via-[hsl(var(--secondary-background-color))]/10 to-[hsl(var(--primary-background-color))]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="apple-headline text-4xl md:text-5xl">
            Conheça o Conteúdo
          </h2>
          <p className="apple-subheadline text-lg md:text-xl text-[hsl(var(--secondary-text-color))] max-w-2xl mx-auto">
            Navegue pelas páginas e descubra a riqueza visual do livro
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-border shadow-lg">
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      aspectRatio="3/4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[hsl(var(--secondary-emphasis-color))] text-primary-foreground hover:bg-[hsl(var(--secondary-emphasis-color))]/90" />
          <CarouselNext className="bg-[hsl(var(--secondary-emphasis-color))] text-primary-foreground hover:bg-[hsl(var(--secondary-emphasis-color))]/90" />
        </Carousel>
      </div>
    </section>
  );
};

export default IllustrationsCarousel;
