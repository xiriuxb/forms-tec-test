const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env;

type AppEnvs = {
  supabase:{
    url:string;
    key:string;
  }
}

export const getEnvs = () => {
  const envs:AppEnvs = {
    supabase: {
      url: VITE_SUPABASE_URL,
      key: VITE_SUPABASE_KEY,
    },
  }
  return envs;
};
