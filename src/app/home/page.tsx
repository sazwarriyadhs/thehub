'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { LogIn, Newspaper, ChevronRight } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay"
import React from 'react';

const sliderServices = [
  {
    title: 'Teknologi Laser Canggih',
    description: 'Solusi presisi untuk pigmentasi, peremajaan kulit, dan penghapusan tato dengan downtime minimal.',
    image: '/images/tekno.jpeg',
    aiHint: 'laser treatment',
  },
  {
    title: 'Perawatan RF & Ultrasound',
    description: 'Mengencangkan kulit, membentuk kontur wajah dan tubuh, serta mengurangi kerutan tanpa prosedur bedah.',
    image: '/images/rfultrasound.jpeg',
    aiHint: 'ultrasound therapy',
  },
  {
    title: 'Manajemen Klien Terintegrasi',
    description: 'Kelola seluruh siklus hidup klien Anda, dari janji temu hingga riwayat perawatan, dalam satu platform.',
    image: '/images/admin.jpeg',
    aiHint: 'clinic management',
  },
];

const newsArticles = [
  {
    title: 'AI Merevolusi Diagnosis Kulit',
    summary: 'Kecerdasan buatan kini mampu menganalisis kondisi kulit dengan akurasi yang lebih tinggi, memberikan rekomendasi perawatan yang dipersonalisasi.',
    image: '/images/aikulit.jpeg',
    aiHint: 'artificial intelligence skin',
    link: '#',
  },
  {
    title: 'Tren Baru: "Skinimalism" dan Perangkat Non-Invasif',
    summary: 'Pasien semakin mencari perawatan dengan hasil alami dan downtime minimal, mendorong inovasi perangkat non-invasif.',
    image: '/images/skinm.jpeg',
    aiHint: 'natural skincare',
    link: '#',
  },
  {
    title: 'Terobosan dalam Teknologi Picosecond Laser',
    summary: 'Generasi terbaru laser picosecond menawarkan hasil yang lebih cepat dan efektif untuk berbagai masalah pigmentasi yang kompleks.',
    image: '/images/terobos.jpeg',
    aiHint: 'laser technology',
    link: '#',
  },
];

const brandLogos = [
    { name: 'Candela', image: '/images/merk/candela.jpg', aiHint: 'candela logo' },
    { name: 'InMode', image: '/images/merk/inmode.png', aiHint: 'inmode logo' },
    { name: 'Sofwave', image: '/images/merk/sofwavebener.png', aiHint: 'sofwave logo' },
    { name: 'BiAxis', image: '/images/merk/biaxis.png', aiHint: 'biaxis logo' },
    { name: 'INDIBA', image: '/images/merk/indiba.jpg', aiHint: 'indiba logo' },
    { name: 'Pollogen', image: '/images/merk/pollogen.png', aiHint: 'pollogen logo' },
    { name: 'Lumenis', image: '/images/merk/lumenis.jpg', aiHint: 'lumenis logo' },
];

export default function HomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  return (
    <main className="flex min-h-screen flex-col items-center bg-muted/40">
      {/* Header Section */}
      <header className="w-full bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/home" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="AesthetiCare Pro Logo"
              width={150}
              height={40}
              data-ai-hint="logo"
              className="object-contain"
            />
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Portal Klien</Link>
            </Button>
            <Button asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Portal Admin
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Slider Section */}
      <section className="w-full">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {sliderServices.map((service, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    data-ai-hint={service.aiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                      {service.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </section>

      {/* News Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Newspaper className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tight">Berita & Inovasi Teknologi Estetika</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Tetap terdepan dengan wawasan terbaru dari dunia estetika global.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.title} className="flex flex-col overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={article.aiHint}
                />
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{article.summary}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={article.link}>
                      Baca Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brands Slider Section */}
      <section className="w-full py-12 bg-background">
        <div className="container mx-auto">
           <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">Merek Terkemuka yang Kami Distribusikan</h3>
           <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {brandLogos.concat(brandLogos).map((logo, index) => ( // Duplicate for continuous effect
                <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <div className="p-1">
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardContent className="flex aspect-video items-center justify-center p-2">
                         <Image
                            src={logo.image}
                            alt={`${logo.name} logo`}
                            width={150}
                            height={75}
                            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            data-ai-hint={logo.aiHint}
                         />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-secondary text-secondary-foreground py-8">
          <div className="container mx-auto text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Serenity AesthetiCare Hub. All rights reserved.</p>
            <p className="mt-2">Platform Manajemen Distributor Estetika Terpadu</p>
          </div>
      </footer>
    </main>
  );
}
