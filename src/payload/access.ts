import type { Access } from 'payload';

/** Logged-in editors see everything; the public REST API sees published documents only. */
export const publishedOrEditor: Access = ({ req }) => (req.user ? true : { _status: { equals: 'published' } });

export const editorsOnly: Access = ({ req }) => Boolean(req.user);

export const anyone: Access = () => true;
