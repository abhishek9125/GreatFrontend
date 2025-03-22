// InfiniteScroll.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const InfiniteScroll = ({ itemsPerPage, allItems, renderItem }) => {

    const [visibleItems, setVisibleItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const observer = useRef();
    const loadingRef = useRef();

    const loadMoreItems = useCallback(() => {
        if (!hasMore || loading) return;

        setLoading(true);

        setTimeout(() => {
            const startIndex = (page - 1) * itemsPerPage;
            const newItems = allItems.slice(startIndex, startIndex + itemsPerPage);
            if (newItems.length > 0) {
                setVisibleItems((prev) => ([...prev, ...newItems]));
                setPage((prev) => prev + 1);
                if (startIndex + itemsPerPage >= allItems.length) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
            setLoading(false);
        }, 500)
    }, [hasMore, loading, itemsPerPage, page, allItems])

    useEffect(() => {
        loadMoreItems();
    }, [])

    useEffect(() => {
        if(!hasMore) return;

        observer.current = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if(entry.isIntersecting && !loading && hasMore) {
                loadMoreItems();
            }
        })

        if(loadingRef.current) {
            observer.current.observe(loadingRef.current)
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        }
    }, [loadMoreItems, loading, hasMore])

    return (
        <>
            <div className='items-wrapper'>
                {
                    visibleItems.map((item) => renderItem(item))
                }
            </div>
            {
                hasMore ?
                <div ref={loadingRef}>
                    {
                        loading &&
                        <div>
                            Loading...
                        </div>
                    }
                </div>
                : <div>
                    No More content to load
                </div>
            }
        </>
    );
};

export default InfiniteScroll;