const supabase = require("../db/database");

const resolvers = {
  Query: {
    blogs: async (_, { offset = 0, limit = 5, category = null }) => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .range(offset, offset + limit - 1)
        .order("createdAt", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
    categories: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("category")
        .neq("category", null)
        .order("category", { ascending: true });
        // .group("category");

      if (error) throw new Error(error.message);
      const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
      console.log("uniqueCategories", data)
      return uniqueCategories.map((category) => ({ name: category }));
    },
    blog: async (_, { id }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    blogsByCategory: async (_, { category }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("category", category);
      if (error) throw new Error(error.message);
      return data;
    },
  },
  Mutation: {
    createBlog: async (_, { featureImage, content, excerpt, category }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert([{ featureImage, content, excerpt, category }])
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    deleteBlog: async (_, { id }) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },
};

module.exports = resolvers;
