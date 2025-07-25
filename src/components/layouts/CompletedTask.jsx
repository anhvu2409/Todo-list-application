import React from 'react';
import { Check, Clock } from 'lucide-react';
import moment from 'moment';

function CompletedTask({ task }) {
    const formatTime = (date) => {
        if (!date) return 'just now';
        return moment(date).fromNow();
    };

    return (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 shadow-lg border border-green-200 mb-4">
            <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                </div>
                
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-700 line-through mb-2">
                        {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-through mb-3">
                        {task.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                        <Clock className="w-3 h-3" />
                        Completed {formatTime(task.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompletedTask;