import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Globe, FileText, Search, Star } from 'lucide-react';

const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState(null);
  const [error, setError] = useState('');

  // Simulate web scraping with mock data
  const mockScrapeWebsite = (url) => {
    // This is where you'd implement actual web scraping
    return {
      businessInfo: {
        name: "TechGear Pro",
        logo: "Found in header",
        contactInfo: {
          email: "support@techgearpro.com",
          phone: "(555) 123-4567",
          address: "123 Tech Street, Silicon Valley, CA"
        }
      },
      websitePurpose: {
        mainCategory: "E-commerce",
        subCategory: "Electronics and Tech Accessories",
        description: "Online retailer specializing in high-quality tech accessories and gadgets",
        targetAudience: "Tech enthusiasts and professionals"
      },
      reviews: [
        {
          author: "John D.",
          rating: 5,
          date: "2024-01-15",
          text: "Excellent selection of products and fast shipping!"
        },
        {
          author: "Sarah M.",
          rating: 4,
          date: "2024-01-10",
          text: "Good quality items but shipping could be faster"
        },
        {
          author: "Mike R.",
          rating: 5,
          date: "2024-01-05",
          text: "Best tech accessories I've found online"
        }
      ],
      products: [
        "Phone Cases",
        "Laptop Accessories",
        "Charging Solutions",
        "Smart Home Devices"
      ],
      socialProof: {
        totalReviews: 1250,
        averageRating: 4.7,
        featuredIn: ["Tech Weekly", "Gadget Review", "Digital Trends"]
      },
      metadata: {
        description: "Premium tech accessories and gadgets for the modern professional",
        keywords: ["tech accessories", "gadgets", "phone cases", "laptop accessories"],
        lastUpdated: "2024-02-01"
      }
    };
  };

  const handleScrape = () => {
    setLoading(true);
    setError('');
    
    if (!url.startsWith('http')) {
      setError('Please enter a valid URL starting with http:// or https://');
      setLoading(false);
      return;
    }
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const data = mockScrapeWebsite(url);
        setScrapedData(data);
      } catch (err) {
        setError('Failed to analyze website. Please try again.');
      }
      setLoading(false);
    }, 2000);
  };

  const InfoSection = ({ title, children }) => (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-medium text-lg">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-6 h-6" />
            Website Information Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleScrape}
              disabled={loading || !url}
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Analyze Website
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {scrapedData && (
            <div className="space-y-6">
              <InfoSection title="Business Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold">{scrapedData.businessInfo.name}</p>
                    <p className="text-sm text-gray-600">{scrapedData.businessInfo.contactInfo.email}</p>
                    <p className="text-sm text-gray-600">{scrapedData.businessInfo.contactInfo.phone}</p>
                    <p className="text-sm text-gray-600">{scrapedData.businessInfo.contactInfo.address}</p>
                  </div>
                  <div>
                    <p className="font-medium">Website Purpose:</p>
                    <p className="text-sm text-gray-600">{scrapedData.websitePurpose.description}</p>
                    <p className="text-sm text-gray-600">Category: {scrapedData.websitePurpose.mainCategory} - {scrapedData.websitePurpose.subCategory}</p>
                  </div>
                </div>
              </InfoSection>

              <InfoSection title="Customer Reviews">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{scrapedData.socialProof.averageRating}</span>
                    <span className="text-sm text-gray-600">out of 5 ({scrapedData.socialProof.totalReviews} reviews)</span>
                  </div>
                  <div className="space-y-3">
                    {scrapedData.reviews.map((review, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{review.author}</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </InfoSection>

              <InfoSection title="Products/Services">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {scrapedData.products.map((product, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded-md text-sm">
                      {product}
                    </div>
                  ))}
                </div>
              </InfoSection>

              <InfoSection title="Website Metadata">
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-medium">Description:</span> {scrapedData.metadata.description}</p>
                  <p className="text-sm"><span className="font-medium">Keywords:</span> {scrapedData.metadata.keywords.join(", ")}</p>
                  <p className="text-sm"><span className="font-medium">Last Updated:</span> {scrapedData.metadata.lastUpdated}</p>
                </div>
              </InfoSection>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteAnalyzer;
