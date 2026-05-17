export const GraficoBarraEmpilhadaSkeleton = () => (
	<div className="flex flex-col w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#121A2B] rounded-xl p-4 tab:p-8 animate-pulse border border-slate-800">
		<div className="flex-1 flex flex-col justify-around w-full relative mb-4">
			<div className="absolute inset-y-0 left-12 right-0 flex justify-evenly pointer-events-none">
				{[1, 2, 3].map((i) => (
					<div key={i} className="w-px h-full bg-slate-700/20" />
				))}
			</div>

			{[...Array(4)].map((_, i) => (
				<div key={i} className="flex items-center gap-3 z-10 w-full">
					
					<div className="w-8 h-3 tab:h-4 bg-slate-700/50 rounded shrink-0" />

					<div className="flex h-4 tab:h-8 w-full">
						<div
							className={`h-full bg-slate-700/40 ${i % 2 === 0 ? "w-1/3" : "w-1/4"}`}
						/>
						<div
							className={`h-full bg-slate-700/30 ${i % 2 === 0 ? "w-1/5" : "w-1/3"}`}
						/>
						<div
							className={`h-full bg-slate-700/50 ${i % 2 === 0 ? "w-1/4" : "w-1/5"}`}
						/>
						<div className="h-full bg-slate-700/20 w-1/6 rounded-r" />
					</div>
				</div>
			))}
		</div>

		<div className="flex justify-around items-center pt-2">
			{[...Array(4)].map((_, i) => (
				<div key={i} className="flex items-center gap-2">
					<div className="w-2 h-2 tab:w-3 tab:h-3 bg-slate-700/50 rounded-sm" />
					<div className="w-10 tab:w-24 h-2 tab:h-3 bg-slate-700/50 rounded" />
				</div>
			))}
		</div>
	</div>
);
export const GraficoLinhaPontosSkeleton = () => (
	<div className="w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#122144] rounded-xl flex p-4 tab:p-10 animate-pulse border border-slate-800">
	<div className="w-full h-full flex relative border-l border-b border-slate-700/50 ml-6 mb-6">
			<div className="absolute w-full top-1/4 h-px bg-slate-700/30" />
			<div className="absolute w-full top-2/4 h-px bg-slate-700/30" />
			<div className="absolute w-full top-3/4 h-px bg-slate-700/30" />

			<div className="absolute -left-8 top-0 w-5 h-2 tab:h-3 bg-slate-700/50 rounded" />
			<div className="absolute -left-8 top-1/4 w-5 h-2 tab:h-3 bg-slate-700/50 rounded" />
			<div className="absolute -left-8 top-2/4 w-5 h-2 tab:h-3 bg-slate-700/50 rounded" />
			<div className="absolute -left-8 top-3/4 w-5 h-2 tab:h-3 bg-slate-700/50 rounded" />
			<div className="absolute -left-8 bottom-0 w-5 h-2 tab:h-3 bg-slate-700/50 rounded" />

			<div className="absolute -bottom-6 left-[10%] w-6 tab:w-10 h-2 tab:h-3 bg-slate-700/50 rounded" />
			<div className="absolute -bottom-6 left-[40%] w-6 tab:w-10 h-2 tab:h-3 bg-slate-700/50 rounded" />
			<div className="absolute -bottom-6 left-[70%] w-6 tab:w-10 h-2 tab:h-3 bg-slate-700/50 rounded" />
		</div>
	</div>
);
