import React from 'react';
import { Recommendation } from '@/types/productivity';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  const getImpactStyles = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-yellow-50 border-yellow-200 shadow-yellow-100';
      case 'Medium':
        return 'bg-blue-50 border-blue-200 shadow-blue-100';
      case 'Low':
        return 'bg-gray-50 border-gray-200 shadow-gray-100';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4 -mx-4 sm:mx-0">
      {recommendations.map((rec, index) => (
        <div 
          key={index} 
          className={`p-3 sm:p-4 rounded-none sm:rounded-lg border-x-0 sm:border-x border-t-0 first:border-t sm:border-t shadow-sm ${getImpactStyles(rec.impact)}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
            <div className="font-semibold capitalize text-base sm:text-lg">
              {rec.type} Optimization
            </div>
            {rec.category && (
              <Badge variant="outline" className="text-xs self-start sm:self-center">
                {rec.category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
          {rec.actionItems && rec.actionItems.length > 0 && (
            <div className="mt-2 space-y-1">
              {rec.actionItems.map((item, i) => (
                <div key={i} className="flex items-start text-sm text-gray-600">
                  <ChevronRight className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                  <span className="flex-1">{item}</span>
                </div>
              ))}
            </div>
          )}
          <div className={`text-xs font-bold mt-2 ${
            rec.impact === 'High' ? 'text-yellow-600' : 
            rec.impact === 'Medium' ? 'text-blue-600' : 
            'text-gray-600'
          }`}>
            Impact: {rec.impact}
          </div>
        </div>
      ))}
    </div>
  );
};