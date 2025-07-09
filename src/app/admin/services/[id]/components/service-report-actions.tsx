'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import { generateWorkOrderPdf } from '@/app/actions';
import type { ServiceRecord } from '@/types';
import { useToast } from '@/hooks/use-toast';

type ServiceReportActionsProps = {
  serviceRecord: ServiceRecord;
};

export function ServiceReportActions({ serviceRecord }: ServiceReportActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    const result = await generateWorkOrderPdf(serviceRecord.id);

    if (result.error || !result.data) {
      toast({
        variant: 'destructive',
        title: 'PDF Generation Failed',
        description: result.error || 'Could not generate the PDF file.',
      });
    } else {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${result.data}`;
      link.download = `work-order-${serviceRecord.id}-${serviceRecord.clientName.replace(/\s/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: 'PDF Generated',
        description: 'Your work order has been downloaded.',
      });
    }

    setIsLoading(false);
  };

  return (
    <Button onClick={handleGeneratePdf} disabled={isLoading}>
      {isLoading ? <Loader2 className="animate-spin" /> : <FileText />}
      Generate Work Order (PDF)
    </Button>
  );
}
